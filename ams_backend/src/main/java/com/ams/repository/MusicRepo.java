package com.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Music;

@Repository
public interface MusicRepo extends JpaRepository<Music, Integer>
{
}
