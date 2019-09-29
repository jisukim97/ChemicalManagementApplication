package com.team.chemical.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.chemical.entity.UserEntity;
import com.team.chemical.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserEntity regist(UserEntity userEntity) {
		return userRepository.save(userEntity);
	}

	@Override
	public UserEntity login(UserEntity userEntity) {
		UserEntity findedEntity = userRepository.findByEmail(userEntity.getEmail());
		if (findedEntity.getPassword().equals(userEntity.getPassword())) {
			return findedEntity;
		} else {
			return null;
		}
	}

}
