package com.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Artist;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, Integer>
{
}
