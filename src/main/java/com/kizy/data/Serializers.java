package com.kizy.data;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Serializers {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private Serializers() {
        // No instantiation.
    }

    public static JsonNode valueToTree(Object value) {
        return MAPPER.valueToTree(value);
    }

    public static ObjectMapper getMapper() {
        return MAPPER;
    }
}
