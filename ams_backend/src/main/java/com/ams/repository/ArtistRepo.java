package com.ams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ams.model.Artist;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, Integer>
{
	@Query(value="select * from artist a order by updated_at desc "
			+ "limit :noOfRow offset :offset ", nativeQuery=true)
	List<Artist> getArtist(@Param("offset") Integer offset, @Param("noOfRow") Integer noOfRow);
}
