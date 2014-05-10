package com.kizy.web;

import java.io.IOException;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;

import com.google.common.collect.Sets;

public class WebResources {

    public static final Set<String> IMAGE_EXTENSIONS =
            Sets.newHashSet("png", "jpg", "jpeg", "gif");

    public static final Set<String> TEST_EXTENSIONS =
            Sets.newHashSet("js", "css", "html");

    public static final String MY_SOAP_BOX_USERNAME = "MY_SOAP_BOX_USERNAME";

    private WebResources() {
        // no instantiation
    }

    public static String getExtension(String path) {
        int lastDotIndex = path.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }
        return path.substring(lastDotIndex + 1);
    }

    public static void sendError(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        response.sendError(status.value(), message);
    }

}
