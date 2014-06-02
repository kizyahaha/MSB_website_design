package com.kizy.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kizy.data.rant.Rant;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.User;

@Controller
@RequestMapping(value = "/rants", method = RequestMethod.GET)
public class RantController {

    @RequestMapping(value = "/add")
    public ResponseEntity<String> addRant(HttpServletRequest request,
                                          @RequestParam("nsfw") boolean nsfw,
                                          @RequestParam("title") String title,
                                          @RequestParam("contents") String contents) {
        User owner = WebResources.userFromCookie(request.getCookies());
        Rant rant = new SimpleRant(nsfw, title, contents, owner);
        owner.addRant(rant);
        return ResponseEntities.plaintext("Added rant");
    }

}
