package com.kizy.data.rant;

import java.util.Map;

import com.google.common.collect.Maps;
import com.kizy.data.user.Users;

public class Rants {

    public static final int STARTING_POWER = 100;

    public static final Rant DUMMY_RANT = new SimpleRant(-1, false, "INVALID", "INVALID",
                                                         Users.DUMMY_USER.getUserId(),
                                                         Users.DUMMY_USER.getUsername());

    private Rants() {
        // no instantiation
    }

    public static Map<String, Object> serialize(Rant rant, boolean isOwner) {
        Map<String, Object> properties = Maps.newHashMap();
        properties.put("id", rant.getRantId());
        properties.put("nsfw", rant.isNsfw());
        properties.put("title", rant.getTitle());
        properties.put("contents", rant.getContents());
        properties.put("owner", rant.getOwnerId());
        properties.put("ownername", rant.getOwnerUsername());
        properties.put("birth", rant.getCreationDate());
        properties.put("death", rant.getDeathDate());
        properties.put("level", rant.getRantLevel());
        if (isOwner) {
            properties.put("upvotes", rant.getUpvoteIds());
            properties.put("downvotes", rant.getDownvoteIds());
            properties.put("power", rant.getRantPower());
        }
        return properties;
    }

}
