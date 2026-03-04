package com.ams.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ams.model.Users;
import com.ams.repository.UsersRepo;
import com.ams.service.UsersService;
import com.ams.utils.LoginUtils;
import com.ams.utils.RoleType;

@Service
public class UserDataServiceImpl implements UsersService
{
	@Autowired
	private UsersRepo usersRepo;

	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Integer registerUser(Users user)
	{
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		if(user.getRoleType() == null)
			user.setRoleType(RoleType.ARTIST);
		return usersRepo.save(user).getId();
	}

	@Override
	public Users getInfo()
	{
		return LoginUtils.getUserInfo();
	}
}
