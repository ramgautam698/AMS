package com.ams.service;

import java.util.List;

import com.ams.model.Artist;
import com.ams.model.Users;

public interface UsersService
{
	Integer registerUser(Users user);
	Users getInfo();
	void deleteUser();
	List<Artist> getArtist(Integer offset, Integer noOfRow);
	Integer addArtist(Artist artist);
	void deleteArtist(Integer id);
}
