package com.ams.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ams.service.AdminService;

@RestController
@RequestMapping("/ams/super-admin")
@CrossOrigin
public class AdminController
{
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/user")
	public ResponseEntity<?> getUsers(@RequestParam(required = false) Integer offset,
			@RequestParam(required = false) Integer noOfRow)
    {
    	log.info("Inside getUsers method of SecurityController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(adminService.getUsers(offset, noOfRow));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
