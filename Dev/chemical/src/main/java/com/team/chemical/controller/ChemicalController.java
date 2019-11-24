package com.team.chemical.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.Chemical;
import com.team.chemical.entity.ChemicalRepository;
import com.team.chemical.entity.Inventory;
import com.team.chemical.entity.Lab;
import com.team.chemical.entity.Msds;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

@RestController
public class ChemicalController {

	@Autowired
	ChemicalRepository chemicalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	Msds msds;

	/**
	 * 화학약품의 정보를 불러오는거
	 * @param userId 사용자의 아이디
	 * @param chemical - name (화학약품 이름)
	 * @return 화학약품 정보
	 */
	@RequestMapping(value="/chemical/info/{userId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String addChemical(@PathVariable int userId, @RequestBody Chemical chemical, HttpServletResponse response) {
		try {
			//화학약품 정보 받아오기
			Chemical msdsInfo = msds.searchChemical(chemical.getName());
			//약품이 없을 경우
			if (msdsInfo==null) {
				throw new Exception("cannot find chemical by name");
			}
			//저장 후 리턴
			msdsInfo = chemicalRepository.save(msdsInfo);
			return new ObjectMapper().writeValueAsString(msdsInfo);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 화학약품이 보관될 장소를 추천 -> 추천해줄 곳과 추천해주지 않을 곳 나눠서 리턴
	 * @param userId 유저 아이디
	 * @param chemicalId 화학약품 아이디
	 * @return 추천 장소 리스트 / 추천 아닌 장소 리스트
	 */
	@RequestMapping(value="/chemical/{userId}/{chemicalId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getSuggestList(@PathVariable int userId, @PathVariable int chemicalId, HttpServletResponse response) {
		try {
			//화학약품 찾아주기
			Chemical chemical = chemicalRepository.findById(chemicalId).get();
			if (chemical==null) {
				throw new Exception("cannot find chemical by id");
			}
			//lab 찾아주기
			User user = userRepository.findById(userId).get();
			Lab myLab = user.getMyLab();
			//첫번째 원소는 추천될꺼의 리스트, 두번째 원소는 안추천될꺼의 리스트
			List<List<Inventory>> suggestList = myLab.getSuggestList(chemical);
			return new ObjectMapper().writeValueAsString(suggestList);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 화학약품을 이 인벤토리에 넣어도 안전한지?
	 * @param userId
	 * @param chemicalId
	 * @param inventoryId
	 * @return 안전하면 inventory정보를, 아니면 null
	 */
	@RequestMapping(value="/chemical/{userId}/{chemicalId}/{inventoryId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String isSafe(@PathVariable int userId, @PathVariable int chemicalId, @PathVariable int inventoryId, HttpServletResponse response) {
		return null;
	}


}

