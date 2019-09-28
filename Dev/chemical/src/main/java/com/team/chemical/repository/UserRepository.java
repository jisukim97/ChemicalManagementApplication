package com.team.chemical.repository;

import org.springframework.data.repository.CrudRepository;

import com.team.chemical.entity.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Integer>{
	
	UserEntity findByEmail(String email);
	
	UserEntity findById(int id);
}
