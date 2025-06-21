package com.oleson.spring.springboot.controllers

import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test
import kotlin.test.assertEquals

@SpringBootTest
class HelloKotlinControllerTests {
    private val SUT = HelloKotlinController()

    @Test
    fun testHello() {
        // Act
        val result = SUT.hello()

        // Assert
        assert(result == "Hello from Kotlin!")
    }

   @ParameterizedTest(name = "{index} - {0}")
   @ValueSource(strings = ["Alice", "Bob", "Charlie"])
   fun testGreeting(name: String) {
        // Act
        val result = SUT.greeting(name)

        // Assert
       assertEquals("Hello, $name!", result)
    }
}