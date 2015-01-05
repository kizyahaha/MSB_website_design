package com.kizy.web;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kizy.data.database.DatabaseUtils;
import com.kizy.data.user.User;

@Controller
@RequestMapping(value = "/login", method = RequestMethod.POST)
public class LoginController {

    @RequestMapping(value = "/login")
    @ResponseBody
    public void login(HttpServletResponse response,
                      @RequestParam("username_accept") String username,
                      @RequestParam("password_accept") String password,
                      @RequestParam(value = "stay_logged_in", defaultValue = "false") boolean stayLogged) throws IOException {
        User user = DatabaseUtils.readUser(username, password);
        if (user != null) {
            Cookie cookie = new Cookie(WebResources.MY_SOAP_BOX_USERID, Long.toString(user.getUserId()));
            cookie.setPath("/");
            if (stayLogged) {
                cookie.setMaxAge(2000000000);
            }
            response.addCookie(cookie);
        } else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
    }

    @RequestMapping(value = "/logout")
    @ResponseBody
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie(WebResources.MY_SOAP_BOX_USERID, "");
        cookie.setValue(null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
