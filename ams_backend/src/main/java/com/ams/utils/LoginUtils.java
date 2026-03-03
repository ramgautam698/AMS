package com.ams.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ams.model.Users;

public class LoginUtils
{
	private static final Map<Integer, Users> loggedInUsers = new HashMap<>();
	private static final Map<String, Integer> idMatch = new HashMap<>();
	
	public static void addLoggedInUser(Integer userId, Users user)
	{
		loggedInUsers.put(userId, user);
		idMatch.put(user.getEmail(), userId);
	}
	
	public static void removeLoggedInUser(Integer userId)
    {
        loggedInUsers.remove(userId);
    }
	
	public static Users getLoggedInUser(Integer userId)
    {
        return loggedInUsers.get(userId);
    }
	
	public static Users getUserInfo()
	{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated())
        {
        	Integer userId = Integer.valueOf(authentication.getName());
        	return getLoggedInUser(userId);
        }
        return null;
	}
	
	public static Integer getIdForMail(String email)
	{
		return idMatch.get(email);
	}
	
	public static void removeMatch(String email)
	{
		idMatch.get(email);
	}
}
