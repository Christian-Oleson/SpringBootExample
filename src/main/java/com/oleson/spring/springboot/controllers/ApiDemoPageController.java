package com.oleson.spring.springboot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ApiDemoPageController {
    @GetMapping("/api-demo")
    public String apiDemoPage() {
        return "api-demo";
    }
}

