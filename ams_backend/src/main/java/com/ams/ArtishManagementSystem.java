package com.ams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableScheduling
public class ArtishManagementSystem
{
    public static void main( String[] args )
    {
//    	Load environment variables from .env file
    	Dotenv dotenv = Dotenv.configure()
    					.filename(".env") // specify the filename (optional if named .env)
    					.load();
    	
//    	Set system properties from .env file
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("DB_URL", dotenv.get("DB_URL"));	
		System.setProperty("JWT_TOKEN_KEY", dotenv.get("JWT_TOKEN_KEY"));
//		Server Port
		System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT"));
    	SpringApplication.run(ArtishManagementSystem.class, args);
    }
}
