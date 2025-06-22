package com.oleson.spring.springboot.controllers

import com.oleson.spring.springboot.services.buildingJavaPrograms.Chapter2
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/HelloKotlin")
class HelloKotlinController(private val chapter2: Chapter2) {

    @GetMapping("/hello")
    fun hello(): String {
        return "Hello from Kotlin!"
    }

    @GetMapping("greeting")
    fun greeting(name: String = "Kotlin"): String {
        return "Hello, $name!"
    }

    @GetMapping("/fibonacci")
    fun fibonacci(number: Int?): ResponseEntity<Int> {
        if (number == null || number <= 0) {
            return ResponseEntity.badRequest().body(null)
        }

        return ResponseEntity.ok(chapter2.fibonacci(number))
    }
}
