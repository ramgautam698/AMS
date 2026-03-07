package com.ams.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ams.model.Artist;
import com.ams.model.Music;
import com.ams.model.Users;
import com.ams.repository.ArtistRepo;
import com.ams.repository.MusicRepo;
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
	
	@Autowired
	private ArtistRepo artistRepo;
	
	@Autowired
	private MusicRepo musicRepo;

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

	@Override
	public void deleteUser()
	{
		Users user = LoginUtils.getUserInfo();
		usersRepo.deleteByEmail(user.getEmail());
		LoginUtils.removeLoggedInUser(user.getId());
	}
	
	@Override
	public List<Artist> getArtist(Integer offset, Integer noOfRow)
	{
		if(offset == null)
			offset =  0;
		if(noOfRow == null)
			noOfRow = 10;
		return artistRepo.getArtist(offset, noOfRow);
	}
	
	@Override
	public Integer addArtist(Artist artist)
	{
		return artistRepo.save(artist).getId();
	}
	
	@Override
	public Integer deleteArtist(Integer artistId)
	{
		Integer count = musicRepo.countAlbum(artistId);
		if(count == 0)
			artistRepo.deleteById(artistId);
		return count;
	}
	
	@Override
	public Integer addUpdateMusic(Music music)
	{
		return musicRepo.save(music).getId();
	}
	
	@Override
	public List<Music> getMusicOfArtist(Integer artishId, Integer offset, Integer noOfRow)
	{
		if(artishId == null)
			artishId = LoginUtils.getUserInfo().getId();
		if(offset == null)
			offset =  0;
		if(noOfRow == null)
			noOfRow = 10;
		return musicRepo.getMusicOfArtist(artishId, offset, noOfRow);
	}
	
	@Override
	public void deleteMusic(Integer id)
	{
		musicRepo.deleteById(id);
	}
}
