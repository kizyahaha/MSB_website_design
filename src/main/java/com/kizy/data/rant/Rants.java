package com.kizy.data.rant;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.Dates;

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
        map.put("birth", Dates.format(rant.getCreationDate()));
        map.put("death", Dates.format(rant.getDeathDate()));
        map.put("power", rant.getRantPower());
        return new JSONObject(map);
    }

    public static JSONArray toJsonArrayFromRants(Collection<Rant> rants) {
        Collection<JSONObject> jsonRants = Lists.newArrayList();
        for (Rant rant : rants) {
            jsonRants.add(toJsonObject(rant));
        }
        return new JSONArray(jsonRants);
    }

    public static JSONArray toJsonArrayFromIds(Collection<Long> rantIds) {
        Collection<JSONObject> jsonRants = Lists.newArrayList();
        for (Long rantId : rantIds) {
            try {
                Rant rant = DatabaseUtils.findRantById(rantId);
                jsonRants.add(toJsonObject(rant));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new JSONArray(jsonRants);
    }

}
