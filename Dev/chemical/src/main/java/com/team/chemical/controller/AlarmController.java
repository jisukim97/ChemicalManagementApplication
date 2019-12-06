package com.team.chemical.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.Alarm;
import com.team.chemical.entity.IllnessAlarm;
import com.team.chemical.entity.Inventory;
import com.team.chemical.entity.Stock;
import com.team.chemical.entity.StockRepository;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

import lombok.Data;

@Data
class AlarmForm {
	int alarmType;
	Stock stock;
	Inventory inventory;
	long left;
	AlarmForm(int alarmType, Stock stock, Inventory inventory){
		this.alarmType = alarmType;
		this.stock = stock;
		this.inventory = inventory;
		if (alarmType==1) {
			LocalDate today = LocalDate.now();
			stock.getExpireDate();
			left = ChronoUnit.DAYS.between(today, stock.getExpireDate());
		}
	}
}

@RestController
public class AlarmController {
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	Alarm alarm;
	
	private Map<String, int[]> illnessCheck;
	
	AlarmController(){
		/*
		 * illnessCheck
		 * {
		 * 		"chemicalName" : [처음사용 후 n개월, 삭제 후 m개월]
		 * }
		 */
		illnessCheck = new HashMap<String, int[]>();
		illnessCheck.put("Dimethylacetamide", new int[] {1, 6} );
		illnessCheck.put("Benzene", new int[] {2, 6} );
		illnessCheck.put("Tetrachloroethane", new int[] {3, 6} );
		illnessCheck.put("Carbon tetrachloride", new int[] {3, 6} );
		illnessCheck.put("Acrylonitrile", new int[] {3, 6} );
		illnessCheck.put("Polyvinyl chloride", new int[] {3, 6} );
		illnessCheck.put("Silicon dioxide", new int[] {12, 12} );
	}
	
	/**
	 * 유저의 전체 알람 리스트 받아오기
	 * 유효기간알람:1, 재고소진알람:2, 질병알람:3
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/alarm/{userId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getAlarms(@PathVariable int userId, HttpServletResponse response) {
		try {
			User user = userRepository.findById(userId).get();
			LocalDate today = LocalDate.now();
			if (user == null) {
				throw new Exception("cannot find user");
			}
			//alarm들 리스트
			List<AlarmForm> alarms = new LinkedList<>();
			for (Stock stock : user.getDateAlarm()) {
				alarms.add(new AlarmForm(1, stock, stock.getInventory()));
			}
			for (Stock stock : user.getVolumeAlarm()) {
				alarms.add(new AlarmForm(2, stock, stock.getInventory()));
			}
			//모든 illnessalaarm(모든 stock이 들어 있음)
			for (IllnessAlarm illnessAlarm : user.getIllnessAlarm()) {
				// 몇달 지났는지?
				long after = ChronoUnit.MONTHS.between(illnessAlarm.getDeleteDate(), today);
				if (illnessCheck.containsKey(illnessAlarm.getStock().getChemical().getName())) {
					int illnessMonth = illnessCheck.get(illnessAlarm.getStock().getChemical().getName())[illnessAlarm.isAlreadyChecked() ? 1 : 0];
					if (illnessMonth > after) {
						alarms.add(new AlarmForm(3, illnessAlarm.getStock(), illnessAlarm.getStock().getInventory()));
					}
				}
			}
			Map<String, Object> result = new HashMap<>();
			result.put("alarms", alarms);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	
	/*
	 * 알람 만들기 테스트
	 */
	@RequestMapping(value="/alarmtest", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String alarmTest(HttpServletResponse response) {
		try {
			alarm.makeDateAlarm();
			alarm.makeVolumeAlarm();
			alarm.makeIllnessAlarm();
			return null;
		} catch(Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/*
	 * 알람 지우기
	 */
	@RequestMapping(value="/alarm/{userId}/{alarmType}/{stockId}", method=RequestMethod.DELETE, produces="text/plain;charset=UTF-8") 
	String deleteAlarm(@PathVariable int userId, @PathVariable int alarmType, @PathVariable int stockId, HttpServletResponse response) {
		try {
			Stock stock = stockRepository.findById(stockId).get();
			User user = userRepository.findById(userId).get();
			if (alarmType == 1) {
				user.getDateAlarm().remove(stock);
			} else if (alarmType == 2) {
				user.getVolumeAlarm().remove(stock);
			} else if (alarmType == 3) {
				for (IllnessAlarm illnessAlarm : user.getIllnessAlarm()) {
					if (illnessAlarm.getStock().getId() == stockId) {
						illnessAlarm.setDeleteDate(LocalDate.now());
						illnessAlarm.setAlreadyChecked(true);
						break;
					}
				}
			} else {
				throw new Exception("AlarmType is wrong!");
			}
			userRepository.save(user);
			return null;
		} catch(Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
}
