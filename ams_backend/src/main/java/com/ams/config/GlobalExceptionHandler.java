package com.ams.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import lombok.Data;

@ControllerAdvice
public class GlobalExceptionHandler
{
    // Generic exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request)
    {
        return new ResponseEntity<>(new ErrorResponse("Internal Server Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // Custom error response class
    @Data
    public static class ErrorResponse
    {
        private String error;
        private String message;

        public ErrorResponse(String error, String message)
        {
            this.error = error;
            this.message = message;
        }
    }
}
