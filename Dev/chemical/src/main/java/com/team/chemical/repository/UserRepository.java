package com.team.chemical.repository;

import org.springframework.data.repository.CrudRepository;

import com.team.chemical.entity.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	User findByEmail(String email);
	
	User findById(int id);
}
