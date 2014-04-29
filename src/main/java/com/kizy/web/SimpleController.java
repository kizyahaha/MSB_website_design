package com.kizy.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/simple", method = RequestMethod.GET)
public class SimpleController {

    @RequestMapping(value = "/hello")
    public ResponseEntity<String> sayHello() {
        HttpHeaders header = new HttpHeaders();
        header.add("Content-Type", MediaType.TEXT_PLAIN.toString());
        return new ResponseEntity<String>("This is coming from a controller!", header, HttpStatus.OK);
    }
}