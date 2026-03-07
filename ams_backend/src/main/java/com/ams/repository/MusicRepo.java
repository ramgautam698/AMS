package com.ams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ams.model.Music;

@Repository
public interface MusicRepo extends JpaRepository<Music, Integer>
{
	@Query(value="select * from music m where m.artish_id = :artishId order by updated_at desc "
			+ "limit :noOfRow offset :offset ", nativeQuery=true)
	List<Music> getMusicOfArtist(@Param("artishId") Integer artishId,
			@Param("offset") Integer offset, @Param("noOfRow") Integer noOfRow);
	
	@Query(value="select count(id) from music m where m.artish_id = :artishId" , nativeQuery=true)
	Integer countAlbum(@Param("artishId") Integer artishId);
}
