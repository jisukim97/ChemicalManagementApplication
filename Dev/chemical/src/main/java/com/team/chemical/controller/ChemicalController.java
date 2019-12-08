package com.team.chemical.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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
import com.team.chemical.entity.IllnessAlarm;
import com.team.chemical.entity.Inventory;
import com.team.chemical.entity.InventoryRepository;
import com.team.chemical.entity.Lab;
import com.team.chemical.entity.LabRepository;
import com.team.chemical.entity.Msds;
import com.team.chemical.entity.Stock;
import com.team.chemical.entity.StockRepository;
import com.team.chemical.entity.User;
import com.team.chemical.entity.UserRepository;

@RestController
public class ChemicalController {

	@Autowired
	ChemicalRepository chemicalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	InventoryRepository inventoryRepository;
	
	@Autowired 
	Msds msds;

	@Autowired
	LabRepository labRepository;
	
	@Autowired
	StockRepository stockRepository;
	
	/**
	 * 화학약품의 정보를 불러오는거
	 * @param userId 사용자의 아이디
	 * @param chemical - name (화학약품 이름)
	 * @return 화학약품 정보
	 */
	@RequestMapping(value="/chemical/info/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String addChemical(@PathVariable int userId, @RequestBody Chemical chemical, HttpServletResponse response) {
		try {
			//화학약품 정보 받아오기
			Chemical msdsInfo = msds.searchChemical(chemical.getName());
			//약품이 없을 경우
			System.out.println(msdsInfo);
			if (msdsInfo==null) {
				throw new Exception("cannot find chemical by name");
			}
			//저장 후 리턴
			msdsInfo = chemicalRepository.save(msdsInfo);
			Map<String, Object> result = new HashMap<>();
			result.put("chemical", msdsInfo);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * userId가 속한 랩의 stock중에 nickname과 겹치는 게 있는지? 
	 * @param userId
	 * @param stock (nickname)
	 * @return null (200 or 500)
	 */
	@RequestMapping(value="/chemical/nickname/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String nicknameCheck(@PathVariable int userId, @RequestBody Stock stock, HttpServletResponse response) {
		try {
			for (Inventory inventory : userRepository.findById(userId).get().getMyLab().getInventories()) {
				for (Stock existStock : inventory.getStocks()) {
					if (existStock.getNickname().equals(stock.getNickname())) {
						throw new Exception("Already Exist");
					}
				}
			}
			return null;
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
			Map<String, Object> result = new HashMap<>();
			List<List<Inventory>> suggestList = myLab.getSuggestList(chemical);
			result.put("suggest", suggestList.get(0));
			result.put("notSuggest", suggestList.get(1));
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 화학약품을 이 인벤토리에 넣어도 안전한지? 적합성 확인
	 * @param userId
	 * @param chemicalId
	 * @param inventoryId
	 * @return 안전하면 inventory정보를, 아니면 null
	 */
	@RequestMapping(value="/chemical/{userId}/{chemicalId}/{inventoryId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String isSafe(@PathVariable int userId, @PathVariable int chemicalId, @PathVariable String inventoryId, HttpServletResponse response) {
		try {
			Inventory inventory = inventoryRepository.findById(inventoryId).get();
			Chemical newChemical = chemicalRepository.findById(chemicalId).get();
			
			Map<String, Object> result = new HashMap<>();
			//inventory의 모든 stock의 chemical과 newchemical이 충돌일어나는지
			for(Stock stock : inventory.getStocks()) {
				if (stock.getChemical().isCrash(newChemical)) {
					result.put("crash", true);
					result.put("crashWith", stock);
					return new ObjectMapper().writeValueAsString(result);
				}
			}
			result.put("crash", false);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 새로운 화학약품을 결정한 인벤토리에 저장
	 * @param userId
	 * @param chemicalId
	 * @param inventoryId
	 * @param expire (YYMMDD)
	 * @param stock 
	 * @param response
	 * @return 해당 inventory에 저장된 stock들 리스트
	 */
	@RequestMapping(value="/chemical/{userId}/{chemicalId}/{inventoryId}/{expire}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String addChemical(@PathVariable int userId, @PathVariable int chemicalId, @PathVariable String inventoryId, 
			@PathVariable String expire, @RequestBody Stock stock, HttpServletResponse response) {
		try {
			Chemical chemical = chemicalRepository.findById(chemicalId).get();
			
			LocalDate expireDate = ApparatusController.getDate(expire);
			if (stock.getNickname().equals("default")) { //여기서 오류남@@@@@@@@@@@@@@
				//닉네임이 비어있을 경우
				//오름차순으로 추가
				Lab myLab = userRepository.findById(userId).get().getMyLab();
				int count = 1;
				for (Inventory inventory : myLab.getInventories()) {
					for (Stock inventoryStock : inventory.getStocks()) {
						if (inventoryStock.getChemical().getName().equals(chemical.getName())) {
							count++;
						}
					}
				}
				stock.setNickname(chemical.getName()+ "_" + count);
			}
			stock.setPutDate(LocalDate.now());
			stock.setExpireDate(expireDate);
			stock.setChemical(chemical);
			stock.setRemainingVolume(stock.getVolume());

			Stock savedStock = stockRepository.save(stock);
			
			Inventory inventory = inventoryRepository.findById(inventoryId).get();
			inventory.getStocks().add(savedStock);
			inventory = inventoryRepository.save(inventory);
			
			savedStock.setInventory(inventory);
			savedStock = stockRepository.save(savedStock);
			
			Map<String, Object> result = new HashMap<>();
			result.put("stocks", inventory.getStocks());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/**
	 * 인벤토리 추가
	 * TODO : 무슨 타입의 인벤토리인지 ABCDE
	 * @param userId의 lab에 inventory 추가하기
	 * @param inventory attribute들
	 * @return
	 */
	@RequestMapping(value="/inventory/{userId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String makeInventory(@PathVariable int userId, @RequestBody Inventory inventory, HttpServletResponse response) {
		try {
			int labId = userRepository.findById(userId).get().getMyLab().getId();
			//아이디 양식은 랩아이디 + 인벤토리 타입 + 랜덤값
			if (inventory.getTemperature() < -3.0) {
				//냉동고
				inventory.setId(labId + "A" + (int)(Math.random()*1000));
			} else if (inventory.getTemperature() < 5.0) {
				//냉장고 
				inventory.setId(labId + "B" + (int)(Math.random()*1000));
			} else if (inventory.getTemperature() < 28.0) {
				//상온
				inventory.setId(labId + "C" + (int)(Math.random()*1000));
			} else if (inventory.getTemperature() < 45.0) {
				//인큐베이터
				inventory.setId(labId + "D" + (int)(Math.random()*1000));
			} else {
				//오븐
				inventory.setId(labId + "E" + (int)(Math.random()*1000));
			}
			Inventory savedInventory = inventoryRepository.save(inventory);
			Lab lab = userRepository.findById(userId).get().getMyLab();
			
			lab.getInventories().add(savedInventory);
			lab = labRepository.save(lab);
						
			savedInventory.setLab(lab);
			savedInventory = inventoryRepository.save(savedInventory);
			
			Map<String, Object> result = new HashMap<>();
			result.put("inventories", lab.getInventories());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 인벤토리 바꾸기
	 * @param userId
	 * @param stockId
	 * @param newInventoryId
	 * @return 새로운 인벤토리에 지금 저장되어 있는 stock들의 리스트
	 */
	@RequestMapping(value="/inventory/{userId}/{stockId}/{newInventoryId}", method=RequestMethod.PUT, produces="text/plain;charset=UTF-8") 
	String changeInventory(@PathVariable int userId, @PathVariable int stockId, @PathVariable String newInventoryId, HttpServletResponse response) {
		try {
			Stock stock = stockRepository.findById(stockId).get();
			Inventory beforeInventory = stock.getInventory();
			
			beforeInventory.getStocks().remove(stock);
			beforeInventory = inventoryRepository.save(beforeInventory);
			
			Inventory newInventory = inventoryRepository.findById(newInventoryId).get();
			newInventory.getStocks().add(stock);
			
			newInventory = inventoryRepository.save(newInventory);
			
			stock.setInventory(newInventory);
			stock = stockRepository.save(stock);
			
			Map<String, Object> result = new HashMap<>();
			result.put("stocks", newInventory.getStocks());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/**
	 * quantity만큼 사용
	 * "volume" : 쓴 용량 < 이걸 body에 담아 줘야 함
	 * @param userId
	 * @param stockId
	 * @param quantity (부피)
	 * @return 
	 */
	@RequestMapping(value="/chemical/{userId}/{stockId}", method=RequestMethod.PUT, produces="text/plain;charset=UTF-8") 
	String useChemical(@RequestBody Stock usedStock, @PathVariable int userId, @PathVariable int stockId, HttpServletResponse response) {
		try {
			Stock stock = stockRepository.findById(stockId).get();
			stock.setRemainingVolume(stock.getRemainingVolume()-usedStock.getVolume());
			stock = stockRepository.save(stock);
			Map<String, Object> result = new HashMap<>();
			result.put("stock", stock);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * stockId 삭제
	 * @param stockId
	 * @return
	 */
	@RequestMapping(value="/chemical/{stockId}", method=RequestMethod.DELETE, produces="text/plain;charset=UTF-8") 
	String deleteChemical(@PathVariable int stockId, HttpServletResponse response) {
		try {
			Stock stock = stockRepository.findById(stockId).get();
			
			//해당 stock에 대한 알람 다 삭제
			Iterator<User> allUser = userRepository.findAll().iterator();
			User tempUser;
			IllnessAlarm temp = new IllnessAlarm();
			temp.setStock(stock);
			while(allUser.hasNext()) {
				tempUser = allUser.next();
				if (tempUser.getDateAlarm().contains(stock)) {
					tempUser.getDateAlarm().remove(stock);
				}
				if (tempUser.getVolumeAlarm().contains(stock)) {
					tempUser.getVolumeAlarm().remove(stock);
				}
				if (tempUser.getIllnessAlarm().contains(temp)) {
					tempUser.getIllnessAlarm().remove(temp);
				}
				userRepository.save(tempUser);
			}
			
			
			Inventory inventory = stock.getInventory();
			//인벤토리에서 삭제
			inventory.getStocks().remove(stock);
			inventory = inventoryRepository.save(inventory);
			//자기자체를 삭제
			stockRepository.delete(stock);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 모든 inventory들 불러오기
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/chemical/{userId}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getAllStocks(@PathVariable int userId, HttpServletResponse response) {
		try {
			User user = userRepository.findById(userId).get();
			Map<String, Object> result = new HashMap<>();
			result.put("inventories", user.getMyLab().getInventories());
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	
}

