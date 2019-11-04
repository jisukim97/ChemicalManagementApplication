package com.team.chemical.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.chemical.entity.User;
import com.team.chemical.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User regist(User user) {
		return userRepository.save(user);
	}

	@Override
	public User login(User user) {
		User findedEntity = userRepository.findByEmail(user.getEmail());
		if (findedEntity.getPassword().equals(user.getPassword())) {
			return findedEntity;
		} else {
			return null;
		}
	}

}
