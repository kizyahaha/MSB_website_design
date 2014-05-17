package com.kizy.web;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.common.base.Strings;
import com.kizy.data.DatabaseUtils;
import com.kizy.data.user.SimpleUser;

@Controller
@RequestMapping(value = "/users", method = RequestMethod.POST)
public class UserController {

	// POST localhost:9876/api/users/add
	//  username = Bill
	//  password = password

	// TODO: figure out why request is sent to /api/users/users/add (jquery-1.11.1:9631 xhr.send)
	@RequestMapping(value = "/add")
	public void addUser(@RequestParam("username") String username,
	                    @RequestParam("password") String password,
	                    @RequestParam("email") String email) throws IOException {
		if (!Strings.isNullOrEmpty(password) && !Strings.isNullOrEmpty(username) && !Strings.isNullOrEmpty(email) ) {
			DatabaseUtils.write(new SimpleUser(username, password, email));
		}
	}

}