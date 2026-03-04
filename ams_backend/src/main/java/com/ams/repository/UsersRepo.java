package com.ams.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ams.model.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, Integer>
{
	@Query(value="select * from users u where email = :email", nativeQuery=true)
	Optional<Users> getUserByEmail(@Param("email") String email);
	
	@Query(value="select * from users u order by updated_at desc "
			+ "limit :noOfRow offset :offset ", nativeQuery=true)
	List<Users> getUsers(@Param("offset") Integer offset, @Param("noOfRow") Integer noOfRow);
}
