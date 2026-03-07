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

import com.ams.model.Artist;
import com.ams.model.Music;
import com.ams.model.Users;
import com.ams.service.UsersService;

@RestController
@RequestMapping("/ams/users")
@CrossOrigin
public class UserController
{
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UsersService userService;
	
	@PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody Users user)
    {
    	log.info("Inside register method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.registerUser(user));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@GetMapping("/")
	public ResponseEntity<?> getInfo()
    {
    	log.info("Inside getInfo method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getInfo());
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	// api for managers
	
	@GetMapping("/manager/artist")
	public ResponseEntity<?> getArtist(@RequestParam(required = false) Integer offset,
			@RequestParam(required = false) Integer noOfRow)
    {
    	log.info("Inside getArtist method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getArtist(offset, noOfRow));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@PostMapping("/manager/artist")
	public ResponseEntity<?> addArtist(@RequestBody Artist artist)
    {
    	log.info("Inside addArtist method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.addArtist(artist));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@DeleteMapping("/manager/artist")
	public ResponseEntity<?> deleteArtist(@RequestParam(required = true) Integer id)
    {
    	log.info("Inside deleteArtist method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.deleteArtist(id));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	// end of api for managers
	
	@GetMapping("/music")
	public ResponseEntity<?> getMusicOfArtist(
			@RequestParam(required = true) Integer artishId,
			@RequestParam(required = false) Integer offset,
			@RequestParam(required = false) Integer noOfRow)
    {
    	log.info("Inside getMusicOfArtist method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(
            		userService.getMusicOfArtist(artishId, offset, noOfRow));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	// api for artist
	
	@PostMapping("/music/artist")
	public ResponseEntity<?> createMusic(@RequestBody Music music)
    {
    	log.info("Inside createMusic method of UserController");
        try
        {
            return ResponseEntity.status(HttpStatus.OK).body(userService.addUpdateMusic(music));
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@DeleteMapping("/music/artist")
	public ResponseEntity<?> deleteMusic(@RequestParam(required = true) Integer musicId)
    {
    	log.info("Inside deleteMusic method of UserController");
        try
        {
        	userService.deleteMusic(musicId);
            return ResponseEntity.status(HttpStatus.OK).body("DELETED");
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	// end of api for artist
}
