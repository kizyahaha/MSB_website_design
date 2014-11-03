package com.kizy.data.user;

import java.util.Map;

import com.google.common.collect.Maps;

public class Users {

    public static final User DUMMY_USER = new SimpleUser(-1, "INVALID", "INVALID", "INVALID");

    private Users() {
        // no instantiation
    }

    public static Map<String, Object> serialize(User user, boolean isOwner) {
        Map<String, Object> properties = Maps.newHashMap();
        properties.put("id", user.getUserId());
        properties.put("username", user.getUsername());
        properties.put("date", user.getCreationDate());
        properties.put("rants", user.getOwnedRantIds());
        if (isOwner) {
            properties.put("email", user.getEmail());
            properties.put("upvotes", user.getUpvoteIds());
            properties.put("downvotes", user.getDownvoteIds());
            properties.put("nsfwPreference", user.getNsfwPreference());
            properties.put("soundsPreference", user.getSoundsPreference());
            properties.put("animationsPreference", user.getAnimationsPreference());
        }
        return properties;
    }

}
