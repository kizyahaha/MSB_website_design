package com.kizy.web;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kizy.data.DatabaseUtils;
import com.kizy.data.user.User;

@Controller
@RequestMapping(value = "/login", method = RequestMethod.POST)
public class LoginController {

    @RequestMapping(value = "/login")
    public ResponseEntity<String> login(@RequestParam("username_accept") String username,
                      @RequestParam("password_accept") String password,
                      HttpServletResponse response) throws IOException {
        User user = DatabaseUtils.readUser(username, password);
        if (user != null) {
            Cookie cookie = new Cookie(WebResources.MY_SOAP_BOX_USERID, Long.toString(user.getUserId()));
            cookie.setPath("/main");
            response.addCookie(cookie);
            return ResponseEntities.plaintext("Successful Login");
        } else {
            WebResources.sendError(response, HttpStatus.FORBIDDEN, "Mismatched username and password");
            return ResponseEntities.plaintext("Faild login", HttpStatus.FORBIDDEN);
        }
    }
}
