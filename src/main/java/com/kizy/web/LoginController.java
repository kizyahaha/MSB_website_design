package com.kizy.web;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kizy.data.DatabaseUtils;
import com.kizy.data.User;

@Controller
@RequestMapping(value = "/login", method = RequestMethod.POST)
public class LoginController {

    @RequestMapping(value = "/login")
    public void login(@RequestParam("username_accept") String username,
                      @RequestParam("password_accept") String password,
                      HttpServletResponse response) throws IOException {
        User user = DatabaseUtils.read(username, password);
        if (user != null) {
            System.out.println("Successful Login!");
            Cookie cookie = new Cookie(WebResources.MY_SOAP_BOX_USERNAME, username);
            cookie.setPath("/main");
            response.addCookie(cookie);
        }
    }
}
