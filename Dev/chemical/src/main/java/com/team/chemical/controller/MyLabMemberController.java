package com.team.chemical.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

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
	 * 랩 아이디로 그 랩의 정보(멤버들 같은거) 찾아오기
	 * @param labId 랩 아이디
	 * @return 랩 정보
	 */
	@RequestMapping(value="/lab/{labId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getLabMemberList(@PathVariable String labId, HttpServletResponse response) {
		try {
			//랩 찾아주기
			Lab findedLab = labRepository.findById(Integer.parseInt(labId)).get();
			if (findedLab==null) {
				throw new Exception("cannot find lab");
			}
			Map<String, Object> result = new HashMap<>();
			result.put("lab", findedLab);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

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
			//findedMember.setAlarms(null);
			
			Map<String, Object> result = new HashMap<>();
			result.put("member", findedMember);
			return new ObjectMapper().writeValueAsString(result);
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
	@RequestMapping(value="/lab/{labId}/{userId}", method=RequestMethod.PUT, produces="text/plain;charset=UTF-8")
	String addMember(@PathVariable int labId, @PathVariable int userId, HttpServletResponse response) {
		try {
			//lab 찾아주기
			Lab myLab = labRepository.findById(labId).get();
			//user 찾아주고 가입일 설정
			User newMember = userRepository.findById(userId).get();
			if( newMember.getMyLab()!=null) {
				throw new Exception("이미 가입되어 있음!");
			}
			newMember.setLabEnrollDate(LocalDate.now());
			newMember = userRepository.save(newMember);
			//lab의 members 컬렉션에 user 추가
			myLab.getMembers().add(newMember);
			//연관관계 저장
			myLab = labRepository.save(myLab);
			
			//user에 lab추가
			newMember.setMyLab(myLab);
			userRepository.save(newMember);
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
			//user에서 myLab 삭제 후 저장
			willDeletedMember.setMyLab(null);
			userRepository.save(willDeletedMember);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/**
	 * userId가 lab 새로 만드는데, name, password 전해준대로 만들어줌
	 * @param lab (name, password)
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/lab/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8")
	String makeLab(@RequestBody Lab lab, @PathVariable int userId, HttpServletResponse response) {
		try {
			if (labRepository.existsByName(lab.getName())) {
				throw new Exception("랩 이름 겹침");
			}
			//lab 만들어주기
			Lab savedLab = labRepository.save(lab);
			//user 찾아주기
			User user = userRepository.findById(userId).get();
			
			//lab의 연관관계 설정 및 저장
			savedLab.getMembers().add(user);
			savedLab = labRepository.save(savedLab);
			
			//user의 연관관계 설정 및 저장
			user.setLabEnrollDate(LocalDate.now());			
			user.setMyLab(savedLab);
			userRepository.save(user);

			Map<String, Object> result = new HashMap<>();
			result.put("lab", savedLab);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/**
	 * 유저가 랩에 직접 들어가는 경우
	 * @param lab password가 들어가 있어야 함
	 * @param labId
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/lab/{labId}/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8")
	String joinLab(@RequestBody Lab lab, @PathVariable int labId, @PathVariable int userId, HttpServletResponse response) {
		try {
			//랩 찾아오기
			Lab findedLab = labRepository.findById(labId).get();
			//비밀번호 판별
			if (!findedLab.getPassword().equals(lab.getPassword())) {
				throw new Exception("랩 비밀번호 틀림");
			}
			//유저 찾아오기
			User user = userRepository.findById(userId).get();
			findedLab.getMembers().add(user);
			//연관관계 저장
			findedLab = labRepository.save(findedLab);
			
			//멤버에도 랩 저장
			user.setMyLab(findedLab);
			user.setLabEnrollDate(LocalDate.now());
			userRepository.save(user);
			return null;
		}catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}

	}
}
