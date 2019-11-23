package com.team.chemical.entity;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	User findByEmail(String email);
	
	boolean existsByEmail(String email);
}
