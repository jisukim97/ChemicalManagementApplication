package com.team.chemical.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	/**
	 * 회원가입
	 * @param user (email, password, name)
	 * @return 가입된 유저의 정보
	 */
	@RequestMapping(value="/regist", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String regist(@RequestBody User user, HttpServletResponse response) {
		try {
			//이메일 중복일 경우 안됨
			if (userRepository.existsByEmail(user.getEmail())) {
				throw new Exception("email already exists");
			}
			//저장 후 비번 가려주기
			User newUser = userRepository.save(user);
			newUser.setPassword(null);
			return new ObjectMapper().writeValueAsString(newUser);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/**
	 * 
	 * @param user (email, password)
	 * @return 로그인된 유저의 정보
	 */
	@RequestMapping(value="/login", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String login(@RequestBody User user, HttpServletResponse response){
		try {
			User findedUser = userRepository.findByEmail(user.getEmail());
			//이메일로 은 유저 없을 경우
			if (findedUser==null) {
				throw new Exception("cannot find user");
			} 
			//비밀번호 일치하지 않을 경우
			if (!findedUser.getPassword().equals(user.getPassword())) {
				throw new Exception("password is not correct");
			}
			findedUser.setPassword(null);
			
			Map<String, Object> result = new HashMap<>();
			result.put("user", findedUser);
			result.put("lab", findedUser.getMyLab());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

}
