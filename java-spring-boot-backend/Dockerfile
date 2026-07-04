# Stage 1: Build executable Spring Boot .jar
FROM maven:3.8.5-openjdk-17-slim AS builder

WORKDIR /app

# Copy Maven Pom file
COPY pom.xml .

# Fetch dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy java source code
COPY src ./src

# Build production jar without running test units
RUN mvn clean package -DskipTests

# Stage 2: Run Spring Boot application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy compiled jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENV GEMINI_API_KEY=""

ENTRYPOINT ["java", "-jar", "app.jar"]
