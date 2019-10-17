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
import com.team.chemical.entity.UserEntity;
import com.team.chemical.service.UserService;

@RestController
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping(value="/regist", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String regist(@RequestBody UserEntity userEntity, HttpServletResponse response) {
		try {
			userService.regist(userEntity);
			return null;
		} catch (Exception e) {
			return null;
		}
	}

	@RequestMapping(value="/login", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String login(@RequestBody UserEntity userEntity, HttpServletResponse response){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			UserEntity findedUser = userService.login(userEntity);
			if (findedUser!=null) {
				findedUser.setPassword(null);
				findedUser.setChemicals(null);
				result.put("user", findedUser);
				return new ObjectMapper().writeValueAsString(result);
			} else {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}


}
