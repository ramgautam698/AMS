package com.ams.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ams.exception.ResourceNotFoundException;
import com.ams.model.Users;
import com.ams.service.AdminService;

@RestController
@RequestMapping("/ams/super-admin")
@CrossOrigin
public class AdminController
{
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private AdminService adminService;
	
//	@PostMapping("/assign-task")
//	public ResponseEntity<?> assignTask(@RequestBody TaskAssignDto task)
//	{
//		log.info("Inside assignTask method of AdminController");
//		try
//		{
//			return ResponseEntity.ok().body(adminService.assignTask(task));
//		}
//		catch(ResourceNotFoundException e)
//		{
//			return ResponseEntity.status(HttpStatus.GONE).body(e.getLocalizedMessage());
//		}
//		catch(Exception e)
//		{
//			System.out.println("Exception in assignTask: " + e.getLocalizedMessage());
//			return ResponseEntity.internalServerError().body(e.getMessage());
//		}
//	}
}
