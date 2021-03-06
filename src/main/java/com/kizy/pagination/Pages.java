package com.kizy.pagination;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.Lists;
import com.kizy.data.Serializers;
import com.kizy.data.rant.Rant;

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

    public static JsonNode serialize(Page page) {
        return Serializers.valueToTree(page);
    }

}
