package com.chemical.service;

import com.chemical.entity.UserEntity;

public interface UserService {
	
	public UserEntity regist(UserEntity userEntity);
	
	public UserEntity login(UserEntity userEntity);

}
