package com.ams.service;

import java.util.List;

import com.ams.model.Users;

public interface AdminService
{
	List<Users> getUsers(Integer offset, Integer noOfRow);
	String deleteUser(String email);
}
