package com.oleson.spring.springboot.controllers;

import com.oleson.spring.springboot.services.buildingJavaPrograms.Chapter1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/HelloJava")
public class HelloJavaController {
    private final Chapter1 Chapter1;

    @Autowired
    public HelloJavaController(Chapter1 chapter1) {
        Chapter1 = chapter1;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Java!";
    }

    @GetMapping("greet")
    public String greet(String name) {
        return "Hello, " + (name != null ? name : "Java") + "!";
    }

    @GetMapping("/exercise1")
    public String exercise1() {
        return Chapter1.exercise1();
    }

    @GetMapping("/exercise2")
    public String exercise2(int outputDepth) {
        return Chapter1.exercise2(outputDepth);
    }

    @GetMapping("/exercise3")
    public String exercise3(String fileName) throws Exception {
        if (fileName == null || fileName.isBlank()) {
            return "File name cannot be null or blank.";
        }

        return Chapter1.readKotlinFile(fileName);
    }
}
