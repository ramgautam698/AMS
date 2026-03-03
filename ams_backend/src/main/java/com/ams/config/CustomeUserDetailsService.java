package com.ams.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ams.model.Users;
import com.ams.repository.UsersRepo;
import com.ams.utils.LoginUtils;

@Service
public class CustomeUserDetailsService implements UserDetailsService
{
	@Autowired
	private UsersRepo userDataRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Optional<Users> user = userDataRepo.getUserByEmail(username);
		if(user.isEmpty())
			throw new UsernameNotFoundException("User not found.");
		LoginUtils.addLoggedInUser(user.get().getId(), user.get());
		
		return User.withUsername(String.valueOf(user.get().getId()))
				.password(user.get().getPassword())
				.roles(user.get().getRoleType().toString())
				.build();
	}
}
