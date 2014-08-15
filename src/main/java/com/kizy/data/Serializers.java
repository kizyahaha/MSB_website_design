package com.kizy.data;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Serializers {

    public static final ObjectMapper MAPPER = new ObjectMapper();

    private Serializers() {
        // No instantiation.
    }

    public static JsonNode valueToTree(Object value) {
        return MAPPER.valueToTree(value);
    }
}
