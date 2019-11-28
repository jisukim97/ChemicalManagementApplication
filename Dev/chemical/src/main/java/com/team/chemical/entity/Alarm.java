package com.team.chemical.entity;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Alarm {
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userRepository;
	
	/**
	 * 모든 유저에게 유효기간 알림 뿌려주기
	 */
	public void makeDateAlarm() {
		//전체 lab의 stock을 대상으로
		Iterator<Stock> wholeStock = stockRepository.findAll().iterator();
		Stock stock;
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
					member.getDateAlarm().add(stock);
					userRepository.save(member);
				}
			}
		}
	}
	
	/**
	 * 약품의 남은 정도 알림 뿌려주기 (비율 20% 이하)
	 */
	public void makeVolumeAlarm() {
		//전체 lab의 stock을 대상으로
		Iterator<Stock> wholeStock = stockRepository.findAll().iterator();
		Stock stock;
		//볼륨 알람
		while(wholeStock.hasNext()) {
			//stock은 모든 stock들 다
			stock = wholeStock.next();
			//만약 유효기간 지난거면 (2주 이하로 남아있으면)
			if (stock.getRemainingVolume()/stock.getVolume() <= 0.2) {
				//이거에 대한 걸 모든 유저에 추가
				Set<User> members = stock.getInventory().getLab().getMembers();
				for (User member : members) {
					member.getVolumeAlarm().add(stock);
					userRepository.save(member);
				}
			}
		}
	}
	
	/**
	 * 질병 알림
	 */
	public void makeIllnessAlarm() {
		
	}
	
	
	

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
					//member.getAlarms().add(stock);
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
							//user.getAlarms().add(inventoryStock);
						}
					}
				}
			}
			userRepository.save(user);
		}
		
	}
	
}
