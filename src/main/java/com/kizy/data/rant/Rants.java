package com.kizy.data.rant;

import com.fasterxml.jackson.databind.JsonNode;
import com.kizy.data.Serializers;
import com.kizy.data.user.Users;

public class Rants {

    public static final int STARTING_POWER = 100;

    public static final Rant DUMMY_RANT = new SimpleRant(-1, false, "INVALID", "INVALID",
                                                         Users.DUMMY_USER.getUserId(),
                                                         Users.DUMMY_USER.getUsername());

    private Rants() {
        // no instantiation
    }

    public static JsonNode serialize(Rant rant, boolean isOwner) {
        return Serializers.valueToTree(rant);
    }

}
