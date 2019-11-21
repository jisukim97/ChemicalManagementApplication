package com.team.chemical.controller;

import java.time.LocalDate;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.Lab;
import com.team.chemical.entity.LabRepository;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

/**
 * 
 * @author yeongmo
 * myLab 멤버 구성 유스케이스에 해당하는 컨트롤러
 */
@RestController
public class MyLabMemberController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	LabRepository labRepository;
	
	/**
	 * email에 해당하는 유저 찾아 보내주기
	 * @param email
	 * @return 해당 이메일에 해당하는 유저 정보
	 */
	@RequestMapping(value="/member/{email}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String findMember(@PathVariable String email, HttpServletResponse response) {
		try {
			//유저 찾아주기
			User findedMember = userRepository.findByEmail(email);
			if (findedMember == null) {
				//해당 이메일에 해당하는 유저 없으면 예외 발생
				throw new Exception("Cannot find member by email");
			}
			//필요없는 정보 다 없애주기
			findedMember.setPassword(null);
			findedMember.setAlarms(null);
			findedMember.setSchedules(null);
			return new ObjectMapper().writeValueAsString(findedMember);
		} catch(Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * labId에 userId 추가 (가입)
	 * @param labId
	 * @param userId
	 */
	@RequestMapping(value="/lab/{labId}/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8")
	String addMember(@PathVariable int labId, @PathVariable int userId, HttpServletResponse response) {
		try {
			//lab 찾아주기
			Lab myLab = labRepository.findById(labId).get();
			//user 찾아주고 가입일 설정
			User newMember = userRepository.findById(userId).get();
			newMember.setLabEnrollDate(LocalDate.now());
			newMember = userRepository.save(newMember);
			//lab의 members 컬렉션에 user 추가
			myLab.getMembers().add(newMember);
			//연관관계 저장
			labRepository.save(myLab);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * labId에서 userId 탈퇴
	 * @param labId
	 * @param userId
	 */
	@RequestMapping(value="/lab/{labId}/{userId}", method=RequestMethod.DELETE, produces="text/plain;charset=UTF-8")
	String quitLab(@PathVariable int labId, @PathVariable int userId, HttpServletResponse response) {
		try {
			//lab 찾아주기
			Lab myLab = labRepository.findById(labId).get();
			//user 찾아주고 가입일 삭제
			User willDeletedMember = userRepository.findById(userId).get();
			willDeletedMember.setLabEnrollDate(null);
			willDeletedMember = userRepository.save(willDeletedMember);
			//lab의 members 컬렉션에 user 삭제
			myLab.getMembers().remove(willDeletedMember);
			//연관관계 저장
			labRepository.save(myLab);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * userId가 lab 새로 만드는데, name, password 전해준대로 만들어줌
	 * @param lab
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/lab/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8")
	String makeLab(@RequestBody Lab lab, @PathVariable int userId, HttpServletResponse response) {
		try {
			//lab 만들어주기
			Lab savedLab = labRepository.save(lab);
			//user 찾아주기
			User user = userRepository.findById(userId).get();
			user.setLabEnrollDate(LocalDate.now());
			user = userRepository.save(user);
			//연관관계 설정
			savedLab.getMembers().add(user);
			//연관관계 저장
			labRepository.save(savedLab);
			
			//정보 가린 후 반환
			savedLab.setPassword(null);
			savedLab.setMembers(null);
			return new ObjectMapper().writeValueAsString(savedLab);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
}
