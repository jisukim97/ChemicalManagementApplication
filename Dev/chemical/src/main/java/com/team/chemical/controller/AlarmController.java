package com.team.chemical.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.Illness;
import com.team.chemical.entity.Inventory;
import com.team.chemical.entity.Stock;
import com.team.chemical.entity.StockRepository;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

@RestController
public class AlarmController {
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	//TODO : 알람 전체 다시 짜기
	void makeAlarm() {
		//유효기간알람
		//질병알람
		
		//전체 lab의 stock을 대상으로
		Iterator<Stock> wholeStock = stockRepository.findAll().iterator();
		Iterator<User> wholeUser = userRepository.findAll().iterator();
		Stock stock;
		User user;
		LocalDate today = LocalDate.now();
		
		//유효기간알람
		while(wholeStock.hasNext()) {
			//stock은 모든 stock들 다
			stock = wholeStock.next();
			//만약 유효기간 지난거면 (2주 이하로 남아있으면)
			if (stock.getExpireDate().plusWeeks(2).isEqual(today) || stock.getExpireDate().plusWeeks(2).isAfter(today)) {
				//이거에 대한 걸 모든 유저에 추가
				Set<User> members = stock.getInventory().getLab().getMembers();
				for (User member : members) {
					member.getAlarms().add(stock);
					userRepository.save(member);
				}
			}
		}
		
		//질병 알람
		while(wholeUser.hasNext()) {
			user = wholeUser.next();
			if (user.getLabEnrollDate() == null) {
				continue;
			}
			for(Inventory inventory : user.getMyLab().getInventories()) {
				for (Stock inventoryStock : inventory.getStocks()) {
					//가입일자가 넣은날짜보다 뒤면 가입일자, 아니면 넣은일자
					LocalDate startDate = user.getLabEnrollDate().isAfter(inventoryStock.getPutDate()) ? 
							user.getLabEnrollDate() : inventoryStock.getPutDate();
					//stock의 모든 illness대상으로 period보다 많이 지났으면 알람에 추가
					for (Illness illness : inventoryStock.getChemical().getIllness()) {
						if (startDate.plusMonths(illness.getPeriod()).isAfter(today)) {
							user.getAlarms().add(inventoryStock);
						}
					}
				}
			}
			userRepository.save(user);
		}
		
	}
	
	/*
	 * 알람 만들기 테스트
	 */
	@RequestMapping(value="/alarmtest", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String alarmTest(HttpServletResponse response) {
		try {
			makeAlarm();
			return null;
		} catch(Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 유저의 전체 알람 리스트 받아오기
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/alarm/{userId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getAlarms(@PathVariable int userId, HttpServletResponse response) {
		try {
			User user = userRepository.findById(userId).get();
			if (user == null) {
				throw new Exception("cannot find user");
			}
			Map<String, Object> result = new HashMap<>();
			result.put("alarms", user.getAlarms());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
}
