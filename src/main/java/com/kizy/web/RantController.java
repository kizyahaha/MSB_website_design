package com.kizy.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Maps;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.Serializers;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.RantLevel;
import com.kizy.data.rant.Rants;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.User;
import com.kizy.filter.AliveFilter;
import com.kizy.filter.BirthSort;
import com.kizy.filter.Filter;
import com.kizy.filter.LevelFilter;
import com.kizy.filter.NsfwFilter;
import com.kizy.filter.PowerSort;
import com.kizy.filter.UsernameFilter;
import com.kizy.pagination.Page;
import com.kizy.pagination.Pages;
import com.kizy.pagination.SimplePage;

@Controller
@RequestMapping(value = "/rants", method = RequestMethod.POST)
public class RantController {

    private static AtomicLong countingId = new AtomicLong(DatabaseUtils.maxRantId());

    private static final Map<String, Filter> FILTERS = Maps.newHashMap();
    static {
        FILTERS.put("username", new UsernameFilter());
        FILTERS.put("alive", new AliveFilter());
        FILTERS.put("level", new LevelFilter());
        FILTERS.put("power", new PowerSort());
        FILTERS.put("birthDate", new BirthSort());
        FILTERS.put("nsfw",  new NsfwFilter());
    }

    @RequestMapping(value = "/add")
    @ResponseBody
    public void addRant(HttpServletRequest request,
                        @RequestParam(value = "nsfw", defaultValue = "false") boolean nsfw,
                        @RequestParam("title") String title,
                        @RequestParam("contents") String contents) {
        User owner = WebResources.currentLoggedInUser(request);
        if (owner.getUserId() != -1) {
	        Rant rant = new SimpleRant(countingId.incrementAndGet(), nsfw, title, contents, owner.getUserId(), owner.getUsername());
	        owner.addRant(rant.getRantId());
	        try {
	            DatabaseUtils.writeRant(rant);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public String listRants(HttpServletRequest request,
    						@RequestParam(value = "appliedFilters", required = false) String appliedFiltersString,
                            @RequestParam(value = "pageNum", required = true) int pageNum) throws IOException {
        if (pageNum < 0) {
            throw new IllegalArgumentException("Cannot request non-positive page number.");
        }
        List<Rant> filteredRants = filterRants(appliedFiltersString);
        if (pageNum == 0){
            return Serializers.valueToTree(filteredRants).toString();
        }
        int firstRantNum = (pageNum-1) * Pages.RANTS_PER_PAGE;
        int numPages = (int)Math.ceil((double)filteredRants.size()/Pages.RANTS_PER_PAGE);
        List<Rant> rantsOnPage = Pages.getRantsOnPage(filteredRants, pageNum);
        Page page = new SimplePage(firstRantNum, numPages, rantsOnPage);
        return  Pages.serialize(page).toString();
    }

    public List<Rant> filterRants(String appliedFiltersString) throws IOException{
        List<Rant> filteredRants = DatabaseUtils.getRants();
        if (appliedFiltersString != null) {
            @SuppressWarnings("unchecked")
            Map<String, String> appliedFilters = Serializers.getMapper().readValue(appliedFiltersString, Map.class);
            for (String s : appliedFilters.keySet()) {
                String arg = appliedFilters.get(s);
                Filter filter = FILTERS.get(s);
                filteredRants = filter.doFilter(filteredRants, arg);
            }
        }
        return filteredRants;
    }

    @RequestMapping(value = "/powers")
    @ResponseBody
    public String listAllPowers(@RequestParam(value = "appliedFilters", required = false) String appliedFiltersString) throws IOException {
    	List<Rant> levelRants = filterRants(appliedFiltersString);
    	List<Integer> rantPowers = new ArrayList<Integer>();
    	for (Rant rant : levelRants){
    		rantPowers.add(rant.getRantPower());
    	}
    	return  Serializers.valueToTree(rantPowers).toString();
    }

    /**
     * KEEP FOREVER
     *
     * dict = {
     *   a: A,
     *   b: B,
     *   c: C
     * }
     *
     * dict.keySet = {a, b, c}
     * dict.valueSet = {A, B, C}
     * dict.get(a) = dict[a] = A
     */


    @RequestMapping(value = "/rantData")
    @ResponseBody
    public String getRantData(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        boolean isOwner = isOwner(WebResources.currentLoggedInUser(request), rant);
        return Serializers.valueToTree(Rants.serialize(rant, isOwner)).toString();
    }

    @RequestMapping(value = "/upvote")
    @ResponseBody
    public void upvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive()) {
            User user = WebResources.currentLoggedInUser(request);
            if (user.getUserId() != -1) {
	            rant.upvote(user.getUserId());
	            user.upvote(rant.getRantId());
	            DatabaseUtils.upvote(user.getUserId(), rant.getRantId());
            }
        }
    }

    @RequestMapping(value = "/downvote")
    @ResponseBody
    public void downvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive()) {
            User user = WebResources.currentLoggedInUser(request);
            if (user.getUserId() != -1) {
	            rant.downvote(user.getUserId());
	            user.downvote(rant.getRantId());
	            DatabaseUtils.downvote(user.getUserId(), rant.getRantId());
            }
        }
    }

    @RequestMapping(value = "/votes")
    @ResponseBody
    public String getVotes(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        User user = WebResources.currentLoggedInUser(request);
        if (!isOwner(user, rant)) {
            return "";
        }
        Map<String, Collection<Long>> votes = Maps.newHashMap();
        votes.put("upvotes", rant.getUpvoteIds());
        votes.put("downvotes", rant.getDownvoteIds());
        return Serializers.valueToTree(votes).toString();
    }

    @RequestMapping(value = "/power")
    @ResponseBody
    public String getPower(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        User user = WebResources.currentLoggedInUser(request);
        if (!isOwner(user, rant)) {
            return "";
        }
        return Integer.toString(rant.getRantPower());
    }

    @RequestMapping(value = "/winner")
    @ResponseBody
    public String getWinner(HttpServletRequest request, @RequestParam("level") String level) throws IOException {
        long winnerId = DatabaseUtils.getLatestWinnerId(RantLevel.fromName(level));
        return getRantData(request, winnerId);
    }

    private boolean isOwner(User user, Rant rant) {
        return rant.getOwnerId() == user.getUserId();
    }

}
