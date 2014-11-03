package com.kizy.web;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.Serializers;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;
import com.kizy.data.user.Users;

@Controller
@RequestMapping(value = "/users", method = RequestMethod.POST)
public class UserController {

    // POST localhost:9876/api/users/add
    // username = Bill
    // password = password

    private static AtomicLong currentId = new AtomicLong(DatabaseUtils.maxUserId());

    @RequestMapping(value = "/add")
    @ResponseBody
    public void addUser(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        @RequestParam("email") String email) {
        try {
            if (isValid(username, password, email)) {
                DatabaseUtils.writeUser(new SimpleUser(currentId.incrementAndGet(), username,
                        password, email));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean isValid(String username, String password, String email) throws IOException {
        // no values are null and username and email are not already used
        return !Strings.isNullOrEmpty(password) && !Strings.isNullOrEmpty(username)
                && !Strings.isNullOrEmpty(email) && DatabaseUtils.findUserByName(username) == null
                && DatabaseUtils.findUserByEmail(email) == null;
    }

    @RequestMapping(value = "/listAll")
    @ResponseBody
    public String listAllUsers() throws IOException {
        return Serializers.valueToTree(DatabaseUtils.getUsers()).toString();
    }

    @RequestMapping(value = "/userData")
    @ResponseBody
    public String getUserData(HttpServletRequest request, HttpServletResponse response,
                              @RequestParam(value = "id", required = false) Long id,
                              @RequestParam(value = "username", required = false) String username)
            throws IOException {
        User user = optionalUser(id, username, request, response);
        return Serializers.valueToTree(user).toString();
    }

    @RequestMapping(value = "/votes")
    @ResponseBody
    public String getVotes(HttpServletRequest request) throws IOException {
        User user = WebResources.currentLoggedInUser(request);
        Map<String, Collection<Long>> votes = Maps.newHashMap();
        if (user == null) {
            votes.put("upvotes", Collections.<Long>emptyList());
            votes.put("downvotes", Collections.<Long>emptyList());
        } else {
            votes.put("upvotes", user.getUpvoteIds());
            votes.put("downvotes", user.getDownvoteIds());
        }
        return Serializers.valueToTree(votes).toString();
    }

    private User optionalUser(Long id, String username, HttpServletRequest request, HttpServletResponse response) throws IOException {
        User user = null;
        if (id == null && username == null) {
            user = WebResources.currentLoggedInUser(request);
        } else if (id == null) {
            user = DatabaseUtils.findUserByName(username);
        } else if (username == null) {
            user = DatabaseUtils.findUserById(id);
        } else {
            User byId = DatabaseUtils.findUserById(id);
            User byName = DatabaseUtils.findUserByName(username);
            if (byId.getUserId() != byName.getUserId()) {
                response.setStatus(HttpStatus.CONFLICT.value());
            } else {
                user = byId;
            }
        }
        if (user == null) {
            user = Users.DUMMY_USER;
        }
        return user;
    }
    
    @RequestMapping(value = "/updateUser")
    @ResponseBody
    public void setUserPreferences(HttpServletRequest request,
    								@RequestParam(value = "nsfwPreference", required = false) Integer nsfwPreference,
    								@RequestParam(value = "soundsPreference", required = false) Integer soundsPreference,
    								@RequestParam(value = "animationsPreference", required = false) Integer animationsPreference,
    								@RequestParam(value = "email", required = false) String new_email) throws IOException {
    	User user = WebResources.currentLoggedInUser(request);
    	if (nsfwPreference != null){
    		user.setNsfwPreference(nsfwPreference);
    	}
    	if (soundsPreference != null){
    		user.setSoundsPreference(soundsPreference);
    	}
    	if (animationsPreference != null){
    		user.setAnimationsPreference(animationsPreference);
    	}
    	//TODO: We need to have an email confirmation and check for duplicates in users
    	if (new_email != null){
    		user.setEmail(new_email);
    	}
    	DatabaseUtils.modifyUser(user.getUserId(), user);
    }

}