package com.kizy.data.user;

import java.util.Collection;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.kizy.data.Dates;
import com.kizy.data.rant.Rants;

public class Users {
    
    public static final User DUMMY_USER = new SimpleUser(-1, "INVALID", "INVALID", "INVALID");

    private Users() {
        // no instantiation
    }

    public static JSONObject toJsonObject(User user) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("id", user.getUserId());
        map.put("username", user.getUsername());
        map.put("email", user.getEmail());
        map.put("rants", Rants.toJsonArrayFromIds(user.getRantIds()));
        map.put("birth", Dates.format(user.getCreationDate()));
        return new JSONObject(map);
    }

    public static JSONArray toJsonArray(Collection<User> users) {
        Collection<JSONObject> jsonUsers = Lists.newArrayList();
        for (User user : users) {
            jsonUsers.add(toJsonObject(user));
        }
        return new JSONArray(jsonUsers);
    }

}
