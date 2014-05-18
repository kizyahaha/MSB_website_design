package com.kizy.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/rants", method = RequestMethod.GET)
public class RantController {

    @RequestMapping(value = "/add")
    public ResponseEntity<String> addRant() {
        return ResponseEntities.plaintext("Added rant");
    }

}
