package com.ams.serviceImpl;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ams.exception.ResourceNotFoundException;
import com.ams.model.Users;
import com.ams.service.AdminService;
import com.ams.service.UsersService;
import com.ams.utils.LoginUtils;

@Service
public class AdminServiceImpl implements AdminService
{
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UsersService userDataService;

}
