package com.ams.service;

import java.util.List;

import com.ams.model.Artist;
import com.ams.model.Music;
import com.ams.model.Users;

public interface UsersService
{
	Integer registerUser(Users user);
	Users getInfo();
	void deleteUser();
	List<Artist> getArtist(Integer offset, Integer noOfRow);
	Integer addArtist(Artist artist);
	Integer deleteArtist(Integer id);
	Integer addUpdateMusic(Music music);
	List<Music> getMusicOfArtist(Integer artishId, Integer offset, Integer noOfRow);
	void deleteMusic(Integer id);
}
