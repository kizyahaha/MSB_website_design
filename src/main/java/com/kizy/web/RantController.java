package com.kizy.web;

import java.io.IOException;
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
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.User;
import com.kizy.filter.AliveFilter;
import com.kizy.filter.Filter;
import com.kizy.filter.LevelFilter;
import com.kizy.filter.PowerSort;
import com.kizy.filter.BirthSort;
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
    }

    @RequestMapping(value = "/add")
    @ResponseBody
    public void addRant(HttpServletRequest request,
                        @RequestParam(value = "nsfw", defaultValue = "false") boolean nsfw,
                        @RequestParam("title") String title,
                        @RequestParam("contents") String contents) {
        User owner = WebResources.currentLoggedInUser(request);
        Rant rant = new SimpleRant(countingId.incrementAndGet(), nsfw, title, contents, owner);
        owner.addRant(rant.getRantId());
        try {
            DatabaseUtils.writeRant(rant);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public String listAllRants(@RequestParam(value = "appliedFilters", required = false) String appliedFiltersString,
                               @RequestParam(value = "pageNum", required = true) int pageNum) throws IOException {
        if (pageNum < 0) {
            throw new IllegalArgumentException("Cannot request non-positive page number.");
        }
        List<Rant> allRants = DatabaseUtils.getRants();
        List<Rant> filteredRants = allRants;
        if (appliedFiltersString != null) {
            @SuppressWarnings("unchecked")
            Map<String, String> appliedFilters = Serializers.getMapper().readValue(appliedFiltersString, Map.class);
            for (String s : appliedFilters.keySet()) {
                String arg = appliedFilters.get(s);
                Filter filter = FILTERS.get(s);
                filteredRants = filter.doFilter(filteredRants, arg);
            }
        }
        if (pageNum == 0){
            return Serializers.valueToTree(filteredRants).toString();
        }
        int firstRantNum = (pageNum-1) * Pages.RANTS_PER_PAGE;
        int numPages = (int)Math.ceil((double)filteredRants.size()/Pages.RANTS_PER_PAGE);
        List<Rant> rantsOnPage = Pages.getRantsOnPage(filteredRants, pageNum);
        Page page = new SimplePage(firstRantNum, numPages, rantsOnPage);
        return  Serializers.valueToTree(page).toString();
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
    public String getRantData(@RequestParam("id") long id) throws IOException {
        return Serializers.valueToTree(DatabaseUtils.findRantById(id)).toString();
    }

    @RequestMapping(value = "/upvote")
    @ResponseBody
    public void upvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive() && !isOwner(WebResources.currentLoggedInUser(request), rant)) {
            User user = WebResources.currentLoggedInUser(request);
            rant.upvote(user.getUserId());
            user.upvote(rant.getRantId());
            DatabaseUtils.upvote(user.getUserId(), rant.getRantId());
        }
    }

    @RequestMapping(value = "/downvote")
    @ResponseBody
    public void downvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive() && !isOwner(WebResources.currentLoggedInUser(request), rant)) {
            User user = WebResources.currentLoggedInUser(request);
            rant.downvote(user.getUserId());
            user.downvote(rant.getRantId());
            DatabaseUtils.downvote(user.getUserId(), rant.getRantId());
        }
    }

    private boolean isOwner(User user, Rant rant) {
        return rant.getOwner().equals(user);
    }

}
