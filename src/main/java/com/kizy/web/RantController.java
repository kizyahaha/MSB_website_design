package com.kizy.web;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kizy.data.DatabaseUtils;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.User;

@Controller
@RequestMapping(value = "/rants", method = RequestMethod.POST)
public class RantController {

    private static AtomicLong id = new AtomicLong(DatabaseUtils.maxRantId());

    @RequestMapping(value = "/add")
    public void addRant(HttpServletRequest request,
                        @RequestParam("nsfw") boolean nsfw,
                        @RequestParam("title") String title,
                        @RequestParam("contents") String contents) {
        User owner = WebResources.userFromCookie(request.getCookies());
        Rant rant = new SimpleRant(id.incrementAndGet(), nsfw, title, contents, owner);
        owner.addRant(rant);
        try {
            DatabaseUtils.writeRant(rant);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
