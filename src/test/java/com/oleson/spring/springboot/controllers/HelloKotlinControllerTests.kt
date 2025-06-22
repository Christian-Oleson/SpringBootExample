package com.oleson.spring.springboot.controllers

import com.oleson.spring.springboot.services.buildingJavaPrograms.Chapter2
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test
import kotlin.test.assertEquals

@SpringBootTest
class HelloKotlinControllerTests {

    private lateinit var sut: HelloKotlinController
    private lateinit var chapter2: Chapter2

    @BeforeEach
    fun setUp() {
        chapter2 = Chapter2()
        sut = HelloKotlinController(chapter2)
    }

    @Test
    fun testHello() {
        // Act
        val result = sut.hello()

        // Assert
        assert(result == "Hello from Kotlin!")
    }

   @ParameterizedTest(name = "{index} - {0}")
   @ValueSource(strings = ["Alice", "Bob", "Charlie"])
   fun testGreeting(name: String) {
        // Act
        val result = sut.greeting(name)

        // Assert
       assertEquals("Hello, $name!", result)
    }

    @ParameterizedTest(name = "{index} - Fibonacci({0})")
    @ValueSource(ints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    fun testFibonacci(number: Int) {
        // Arrange
        val fibonacci = chapter2.fibonacci(number)

        // Act
        val result = sut.fibonacci(number)

        // Assert
        assert(result.statusCode.is2xxSuccessful)
        assertEquals(fibonacci, result.body)
    }

    @Test
    fun invalidFibonacci() {
        // Act
        val result = sut.fibonacci(-1)

        // Assert
        assert(result.statusCode.is4xxClientError)
        assert(result.body == null)
    }
}