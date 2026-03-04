package com.ams.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ams.config.JwtUtil;
import com.ams.model.Users;
import com.ams.utils.LoginUtils;

@RestController
@RequestMapping("/ams/security")
@CrossOrigin
public class SecurityController
{
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	private static final Logger log = LoggerFactory.getLogger(SecurityController.class);
	
	@PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody Users authRequest)
    {
    	log.info("Inside login method of SecurityController");
        try
        {
        	Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Integer userId = LoginUtils.getIdForMail(authRequest.getEmail());
            String token = jwtUtil.generateToken(userId);
            LoginUtils.getLoggedInUser(userId).setPassword(token);
            Users user = LoginUtils.getLoggedInUser(userId);
            System.out.println("Token: " + token);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        catch(AuthenticationException e)
        {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@GetMapping("/user-login")
	public ResponseEntity<?> userLogin()
	{
		log.info("Inside userLogin method of SecurityController");
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Please login before accessing other page.");
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> users()
	{
		log.info("Inside users method of SecurityController");
		return ResponseEntity.ok().body(LoginUtils.getUserInfo());
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout()
	{
		log.info("Inside logout method of SecurityController");
		return ResponseEntity.ok().body("You are now logged out.");
	}
	
	@GetMapping("/expired-session")
	public ResponseEntity<?> expiredSession()
	{
		log.info("Inside expiredSession method of SecurityController");
		return ResponseEntity.ok().body("Session Expired.");
	}
}
