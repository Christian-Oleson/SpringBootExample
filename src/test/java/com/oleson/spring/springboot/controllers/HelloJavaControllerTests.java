package com.oleson.spring.springboot.controllers;

import com.oleson.spring.springboot.services.buildingJavaPrograms.Chapter1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class HelloJavaControllerTests {

    private Chapter1 chapter1Mock;
    private HelloJavaController SUT;

    @BeforeEach
    void setUp() {
        chapter1Mock = Mockito.mock(Chapter1.class);
        SUT = new HelloJavaController(chapter1Mock);
    }

    @Test
    void hello_returns_helloJavaString() {
        // Arrange
        String expected = "Hello, Java!";

        // Act
        String actual = SUT.hello();

        // Assert
        assert actual.equals(expected) : "Expected: " + expected + ", but got: " + actual;
    }

    @ParameterizedTest
    @CsvSource({
            "World",
            "Java",
            "''",
            "'null'"
    })
    void greet_withName_returnsGreetingWithName(String name) {
        // Arrange
        var expected = "Hello, " + name + "!";

        // Act
        String actual = SUT.greet(name);

        // Assert
        assert actual.equals(expected) : "Expected: " + expected + ", but got: " + actual;
    }
}
