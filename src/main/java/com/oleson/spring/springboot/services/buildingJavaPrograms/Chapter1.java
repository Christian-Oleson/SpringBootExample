package com.oleson.spring.springboot.services.buildingJavaPrograms;

import org.springframework.stereotype.Service;

@Service
public class Chapter1 {

    public String exercise1() {
        var sb = new StringBuilder();
        sb.append("//////////////////////\r\n");
        sb.append("|| Victory is mine! ||\r\n");
        sb.append("//////////////////////\r\n");

        return sb.toString();
    }

    public String exercise2(int outputDepth) {
        if (outputDepth <= 0) {
            return "";
        }

        var sb = new StringBuilder();
        var startingChar = "\\";
        var endingChar = "/";

        // Top half of spike
        for (int i = 0; i < outputDepth; i++) {
            sb.append(" ".repeat(outputDepth - i - 1));
            sb.append("\\".repeat(i + 1));
            sb.append("/".repeat(i + 1));
            sb.append(" ".repeat(outputDepth - i - 1));
            sb.append("\r\n");
        }

        // Bottom half of spike
        for (int i = outputDepth - 1; i >= 0; i--) {
            sb.append(" ".repeat(outputDepth - i - 1));
            sb.append("/".repeat(i + 1));
            sb.append("\\".repeat(i + 1));
            sb.append(" ".repeat(outputDepth - i - 1));
            sb.append("\r\n");
        }

        return sb.toString();
    }
}
