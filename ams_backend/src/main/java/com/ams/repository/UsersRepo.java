package com.ams.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ams.model.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, Integer>
{
	@Query(value="select u from users u where email = :email", nativeQuery=true)
	Optional<Users> getUserByEmail(@Param("email") String email);
}
