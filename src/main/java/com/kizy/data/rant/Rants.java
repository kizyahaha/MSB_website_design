package com.kizy.data.rant;

import java.util.Collection;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

public class Rants {

    private Rants() {
        // no instantiation
    }

    public static JSONObject toJsonObject(Rant rant) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("id", rant.getRantId());
        map.put("nsfw", rant.isNsfw());
        map.put("title", rant.getTitle());
        map.put("contents", rant.getContents());
        return new JSONObject(map);
    }

    public static JSONArray toJsonArray(Collection<Rant> rants) {
        Collection<JSONObject> jsonRants = Lists.newArrayList();
        for (Rant rant : rants) {
            jsonRants.add(toJsonObject(rant));
        }
        return new JSONArray(jsonRants);
    }

}
