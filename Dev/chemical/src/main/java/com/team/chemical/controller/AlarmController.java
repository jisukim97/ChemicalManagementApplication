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
	AlarmForm(int alarmType, Stock stock, Inventory inventory) throws Exception {
		this.alarmType = alarmType;
		stock.setInventory(null);
		this.stock = stock;
		inventory.setStocks(null);
		inventory.setLab(null);
		this.inventory = inventory;
		if (alarmType==1) {
			LocalDate today = LocalDate.now();
			stock.getExpireDate();
			left = ChronoUnit.DAYS.between(today, stock.getExpireDate());
		}

	}
	AlarmForm(int alarmType, Stock stock, Inventory inventory, long after) throws Exception{
		this.alarmType = alarmType;
		stock.setInventory(null);
		this.stock = stock;
		inventory.setStocks(null);
		inventory.setLab(null);
		this.inventory = inventory;
		this.left = after;
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
		illnessCheck.put("dimethylacetamide", new int[] {1, 6} );
		illnessCheck.put("benzene", new int[] {2, 6} );
		illnessCheck.put("tetrachloroethane", new int[] {3, 6} );
		illnessCheck.put("carbon tetrachloride", new int[] {3, 6} );
		illnessCheck.put("acrylonitrile", new int[] {3, 6} );
		illnessCheck.put("polyvinyl chloride", new int[] {3, 6} );
		illnessCheck.put("silicon dioxide", new int[] {12, 12} );
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
				try {
					alarms.add(new AlarmForm(1, stock, stock.getInventory()));
				} catch (Exception e) {
					System.out.println("Error stock : " + stock.getId());
					e.printStackTrace();
				}
			}
			for (Stock stock : user.getVolumeAlarm()) {
				try {
					alarms.add(new AlarmForm(2, stock, stock.getInventory()));
				} catch (Exception e) {
					System.out.println("Error stock : " + stock.getId());
					e.printStackTrace();
				}
			}
			//모든 illnessalaarm(모든 stock이 들어 있음)
			for (IllnessAlarm illnessAlarm : user.getIllnessAlarm()) {
				// 몇달 지났는지? -> 이것도 left에 담아 보내줌
				//System.out.println("getDeleteDate : " + illnessAlarm.getDeleteDate() + " / today : " + today);
				long after = ChronoUnit.MONTHS.between(illnessAlarm.getDeleteDate(), today);
				String chemName = illnessAlarm.getStock().getChemical().getName().toLowerCase();
				//System.out.println(chemName);
				if (illnessCheck.containsKey(chemName)) {

					int illnessMonth = illnessCheck.get(chemName)[illnessAlarm.isAlreadyChecked() ? 1 : 0];

					//System.out.println("after : " + after + " / illnessMonth : " + illnessMonth);
					if (illnessMonth < after) {
						alarms.add(new AlarmForm(3, illnessAlarm.getStock(), illnessAlarm.getStock().getInventory(), after));
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

	/**
	 * userId에게 stockId의 volumeAlarm 발생시킴
	 * @param userId
	 * @param stockId
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/alarm/{userId}/{stockId}", method=RequestMethod.PUT, produces="text/plain;charset=UTF-8") 
	String makeVolumeAlarm(@PathVariable int userId, @PathVariable int stockId, HttpServletResponse response) {
		try {
			User user = userRepository.findById(userId).get();
			Stock stock = stockRepository.findById(stockId).get();
			user.getVolumeAlarm().add(stock);
			userRepository.save(user);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

}
