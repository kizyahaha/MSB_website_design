package com.kizy.web;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.common.base.Charsets;
import com.google.common.base.Strings;
import com.google.common.io.Files;

@Controller
@RequestMapping(value = "/users", method = RequestMethod.POST)
public class UserController {
	
	private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
	private static final File USERS_FILE = new File(USERS_FILENAME);
	
	// POST localhost:9876/api/users/add
	//  username = Bill
	//  password = password
	
	@RequestMapping(value = "/add")
	public void addUser(@RequestParam("username") String username, @RequestParam("password") String password) throws IOException {
		if (!Strings.isNullOrEmpty(password) && !Strings.isNullOrEmpty(username)) {
			Files.write(username + ", " + password, USERS_FILE, Charsets.UTF_8);
		}
	}

}