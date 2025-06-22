package com.oleson.spring.springboot.services.buildingJavaPrograms

import org.springframework.stereotype.Service

@Service
class Chapter2 {
    fun fibonacci(number: Int): Int {
        if (number <= 0) {
            throw IllegalArgumentException("Number must be positive")
        }

        return when (number) {
            1 -> 0
            2 -> 1
            else -> fibonacci(number - 1) + fibonacci(number - 2)
        }
    }
}