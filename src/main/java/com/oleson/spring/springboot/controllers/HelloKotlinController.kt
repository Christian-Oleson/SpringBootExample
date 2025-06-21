package com.oleson.spring.springboot.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/HelloKotlin")
class HelloKotlinController {

    @GetMapping("/hello")
    fun hello(): String {
        return "Hello from Kotlin!"
    }

    @GetMapping("greeting")
    fun greeting(name: String = "Kotlin"): String {
        return "Hello, $name!"
    }
}
