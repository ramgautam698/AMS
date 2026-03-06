package com.ams.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ams.model.Users;
import com.ams.repository.UsersRepo;
import com.ams.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService
{
	@Autowired
	private UsersRepo usersRepo;

	@Override
	public List<Users> getUsers(Integer offset, Integer noOfRow)
	{
		if(offset == null)
			offset =  0;
		if(noOfRow == null)
			noOfRow = 10;
		return usersRepo.getUsers(offset, noOfRow);
	}

	@Override
	public String deleteUser(String email)
	{
		usersRepo.deleteByEmail(email);
		return email;
	}
	
}
