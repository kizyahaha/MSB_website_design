package com.kizy.web;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kizy.data.DatabaseUtils;
import com.kizy.data.Serializers;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.User;

@Controller
@RequestMapping(value = "/rants", method = RequestMethod.POST)
public class RantController {

    private static AtomicLong countingId = new AtomicLong(DatabaseUtils.maxRantId());

    @RequestMapping(value = "/add")
    @ResponseBody
    public void addRant(HttpServletRequest request,
                        @RequestParam(value = "nsfw", defaultValue = "false") boolean nsfw,
                        @RequestParam("title") String title,
                        @RequestParam("contents") String contents) {
        User owner = WebResources.currentLoggedInUser(request);
        Rant rant = new SimpleRant(countingId.incrementAndGet(), nsfw, title, contents, owner);
        owner.addRant(rant.getRantId());
        try {
            DatabaseUtils.writeRant(rant);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/listAll")
    @ResponseBody
    public String listAllRants() throws IOException {
        return Serializers.valueToTree(DatabaseUtils.getRants()).toString();
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public String listUserRants(@RequestParam("username") String username) throws IOException {
        User user = DatabaseUtils.findUserByName(username);
        return Serializers.valueToTree(user.getOwnedRantIds()).toString();
    }

    @RequestMapping(value = "/rantData")
    @ResponseBody
    public String getRantData(@RequestParam("id") long id) throws IOException {
        return Serializers.valueToTree(DatabaseUtils.findRantById(id)).toString();
    }

    @RequestMapping(value = "/upvote")
    @ResponseBody
    public void upvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive()) {
            User user = WebResources.currentLoggedInUser(request);
            rant.changePower(1);
            rant.upvote(user.getUserId());
            user.upvote(rant.getRantId());
            DatabaseUtils.modifyRant(id, rant);
        }
    }

    @RequestMapping(value = "/downvote")
    @ResponseBody
    public void downvote(HttpServletRequest request, @RequestParam("id") long id) throws IOException {
        Rant rant = DatabaseUtils.findRantById(id);
        if (rant.isAlive()) {
            User user = WebResources.currentLoggedInUser(request);
            rant.changePower(-1);
            rant.downvote(user.getUserId());
            user.downvote(rant.getRantId());
            DatabaseUtils.modifyRant(id, rant);
        }
    }

}
