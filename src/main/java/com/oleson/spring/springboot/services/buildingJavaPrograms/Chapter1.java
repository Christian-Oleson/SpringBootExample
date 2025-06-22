package com.oleson.spring.springboot.services.buildingJavaPrograms;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

    public String readKotlinFile(String fileName) throws Exception {
        var filePath = findFileRecursively("C:\\proj-old", fileName);
        return Files.readString(Path.of(filePath), StandardCharsets.UTF_8);
    }

    public static String findFileRecursively(String rootDir, String fileName) throws Exception {
        try (var paths = Files.walk(Paths.get(rootDir))) {
            return paths
                    .filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().equals(fileName))
                    .map(Path::toString)
                    .findFirst()
                    .orElse(null);
        }
    }
}
