package com.team.chemical.service;

import com.team.chemical.entity.UserEntity;

public interface UserService {
	
	public UserEntity regist(UserEntity userEntity);
	
	public UserEntity login(UserEntity userEntity);

}
