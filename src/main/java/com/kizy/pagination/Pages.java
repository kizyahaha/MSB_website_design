package com.kizy.pagination;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.kizy.data.Serializers;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.Rants;
import com.kizy.data.user.User;

public class Pages {

    public static final int RANTS_PER_PAGE = 10;

    private Pages() {
        // no instantiation
    }

    public static List<Rant> getRantsOnPage(List<Rant> rants, int pageNum) {
        List<Rant> rantsOnPage = Lists.newArrayList();
        int num = 0;
        while ( (pageNum-1) * Pages.RANTS_PER_PAGE + num < rants.size() && num < Pages.RANTS_PER_PAGE) {
            rantsOnPage.add( rants.get((pageNum-1) * Pages.RANTS_PER_PAGE + num) );
            num++;
        }
        return rantsOnPage;
    }

    public static Map<String, Object> filterPage(Page page, User owner) {
        Map<String, Object> properties = Maps.newHashMap();
        List<Rant> rants = page.getRantsOnPage();
        List<Map<String, Object>> filteredRants = Lists.newArrayList();
        for (Rant rant : rants) {
            filteredRants.add(Rants.filterOwner(rant, owner.getUserId() == rant.getOwnerId()));
        }
        properties.put("rantsOnPage", filteredRants);
        properties.put("firstRantNum", page.getFirstRantNum());
        properties.put("numPages", page.getNumPages());
        return properties;
    }

    public static JsonNode serialize(Page page, User owner) {
        return Serializers.valueToTree(filterPage(page, owner));
    }

}
