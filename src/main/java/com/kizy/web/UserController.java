package com.kizy.web;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Strings;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;
import com.kizy.data.user.Users;

@Controller
@RequestMapping(value = "/users", method = RequestMethod.POST)
public class UserController {

	// POST localhost:9876/api/users/add
	//  username = Bill
	//  password = password

    private static AtomicLong id = new AtomicLong(DatabaseUtils.maxUserId());

	// TODO: figure out why request is sent to /api/users/users/add (jquery-1.11.1:9631 xhr.send)
	@RequestMapping(value = "/add")
	@ResponseBody
	public void addUser(@RequestParam("username") String username,
	                    @RequestParam("password") String password,
	                    @RequestParam("email") String email) {
	    try {
	        if (isValid(username, password, email)) {
	            DatabaseUtils.writeUser(new SimpleUser(id.incrementAndGet(), username, password, email));
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

	private boolean isValid(String username, String password, String email) throws IOException {
	    // no values are null and username and email are not already used
	    return !Strings.isNullOrEmpty(password) && !Strings.isNullOrEmpty(username) && !Strings.isNullOrEmpty(email) &&
	            DatabaseUtils.findUserByName(username) == null && DatabaseUtils.findUserByEmail(email) == null;
	}

	@RequestMapping(value = "/listAll")
	@ResponseBody
    public String listAllUsers() throws IOException {
        JSONArray users = Users.toJsonArray(DatabaseUtils.getUsers());
        return users.toString();
    }

	@RequestMapping(value = "/userData")
	@ResponseBody
    public String getUserData(HttpServletRequest request, HttpServletResponse response,
                              @RequestParam(value = "id", required = false) Long id,
                              @RequestParam(value = "username", required = false) String username) throws IOException {
        User user;
        if (id == null && username == null) {
            user = WebResources.userFromRequest(request);
        } else if (id == null) {
            user = DatabaseUtils.findUserByName(username);
        } else if (username == null) {
            user = DatabaseUtils.findUserById(id);
        } else {
            User byId = DatabaseUtils.findUserById(id);
            User byName = DatabaseUtils.findUserByName(username);
            if (byId.getUserId() != byName.getUserId()) {
                response.setStatus(HttpStatus.CONFLICT.value());
                return "Id given and Username given, but they do not match.";
            }
            user = byId;
        }
        return Users.toJsonObject(user).toString();
    }

}