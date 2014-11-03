package com.kizy.data.user;

import com.fasterxml.jackson.databind.JsonNode;
import com.kizy.data.Serializers;


public class Users {

    public static final User DUMMY_USER = new SimpleUser(-1, "INVALID", "INVALID", "INVALID");

    private Users() {
        // no instantiation
    }

    public static JsonNode serialize(User user, boolean isOwner) {
        return Serializers.valueToTree(user);
    }

}
