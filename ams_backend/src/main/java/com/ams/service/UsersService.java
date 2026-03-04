package com.ams.service;

import java.util.List;

import com.ams.model.Users;

public interface UsersService
{
	Integer registerUser(Users user);
	Users getInfo();
}
