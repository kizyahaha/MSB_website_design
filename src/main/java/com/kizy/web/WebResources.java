package com.kizy.web;

import java.io.IOException;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;

import com.google.common.collect.Sets;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.user.User;

public class WebResources {

    public static final Set<String> IMAGE_EXTENSIONS =
            Sets.newHashSet("png", "jpg", "jpeg", "gif");

    public static final Set<String> TEST_EXTENSIONS =
            Sets.newHashSet("js", "css", "html");

    public static final String MY_SOAP_BOX_USERID = "MY_SOAP_BOX_USERID";

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

    public static User userFromCookie(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(MY_SOAP_BOX_USERID)) {
                try {
                    return DatabaseUtils.findUserById(Long.parseLong(cookie.getValue()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

}
