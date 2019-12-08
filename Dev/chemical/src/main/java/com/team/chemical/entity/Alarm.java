package com.team.chemical.entity;

import java.time.LocalDate;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Alarm {
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	IllnessAlarmRepository illnessAlarmRepository;
	/**
	 * 모든 유저에게 유효기간 알림 뿌려주기
	 */
	public void makeDateAlarm() {
		//전체 lab의 stock을 대상으로
		//Iterator<Stock> wholeStock = stockRepository.findAll().iterator();
		//Stock stock;
		LocalDate today = LocalDate.now();
		
		/*
		//유효기간알람
		while(wholeStock.hasNext()) {
			//stock은 모든 stock들 다
			stock = wholeStock.next();
			//만약 유효기간 지난거면 (2주 이하로 남아있으면)
			if (stock.getExpireDate().plusWeeks(2).isEqual(today) || today.plusWeeks(2).isAfter(stock.getExpireDate())) {
				//이거에 대한 걸 모든 유저에 추가
				Set<User> members = stock.getInventory().getLab().getMembers();
				for (User member : members) {
					member.getDateAlarm().add(stock);
					userRepository.save(member);
				}
			}
		}
		
		*/
		
		Iterator<User> users = userRepository.findAll().iterator();
		User user;
		while(users.hasNext()) {
			user = users.next();
			if (user.getMyLab() == null)
				continue;
			for (Inventory inventory : user.getMyLab().getInventories()) {
				for (Stock stock : inventory.getStocks()) {
					if (stock.getExpireDate().plusWeeks(2).isEqual(today) || today.plusWeeks(2).isAfter(stock.getExpireDate())) {
						if (!user.getDateAlarm().contains(stock)) {
							user.getDateAlarm().add(stock);
							//user = userRepository.save(user);
						}
						//만약 유효기간 지난거면 안됨
						if (stock.getExpireDate().isAfter(today)) {
							stock.setRemainingVolume(0.0f);
							stockRepository.save(stock);
						}
					}
				}
			}
			userRepository.save(user);
		}
	}
	
	/**
	 * 약품의 남은 정도 알림 뿌려주기 (비율 20% 이하)
	 */
	public void makeVolumeAlarm() {
		//전체 lab의 stock을 대상으로
		/*
		Iterator<Stock> wholeStock = stockRepository.findAll().iterator();
		Stock stock;
		//볼륨 알람
		while(wholeStock.hasNext()) {
			//stock은 모든 stock들 다
			stock = wholeStock.next();
			if (stock.getRemainingVolume()/stock.getVolume() <= 0.2) {
				//이거에 대한 걸 모든 유저에 추가
				Set<User> members = stock.getInventory().getLab().getMembers();
				for (User member : members) {
					if (!member.getVolumeAlarm().contains(stock)) {
						User findedMember = userRepository.findById(member.getId()).get();
						findedMember.getVolumeAlarm().add(stock);
						userRepository.save(findedMember);
					}
				}
			}
		}
		
		*/
		Iterator<User> users = userRepository.findAll().iterator();
		User user;
		while(users.hasNext()) {
			user = users.next();
			if (user.getMyLab() == null)
				continue;
			for (Inventory inventory : user.getMyLab().getInventories()) {
				for (Stock stock : inventory.getStocks()) {
					if (stock.getRemainingVolume()/stock.getVolume() <= 0.2) {
						if (!user.getVolumeAlarm().contains(stock)) {
							user.getVolumeAlarm().add(stock);
							//user = userRepository.save(user);
						}
					}
				}
			}
			userRepository.save(user);
		}
	}

	
	/**
	 * 질병 알림
	 */
	public void makeIllnessAlarm() {
		//TODO: 질병 알림 구현
		//일단 user에서 모든 stock으로 모든 illnessAlarm을 만들어준다
		//그다음 보내줄 때 판별해서 보내준다
		Iterator<User> wholeUser = userRepository.findAll().iterator();
		User user;
		LocalDate today = LocalDate.now();
		while(wholeUser.hasNext()) {
			user = wholeUser.next();
			if (user.getMyLab()==null || user.getMyLab().getInventories()==null)
				continue;
			for(Inventory inventory : user.getMyLab().getInventories()){
				for (Stock stock : inventory.getStocks()) {
					IllnessAlarm alarm = new IllnessAlarm();
					alarm.setStock(stock);
					if (user.getIllnessAlarm().contains(alarm)) {
						continue;
					} else {
						alarm.setDeleteDate(today.isBefore(stock.getPutDate()) ? stock.getPutDate() : today);
						alarm = illnessAlarmRepository.save(alarm);
						user.getIllnessAlarm().add(alarm);
					}
				}
			}
			userRepository.save(user);
		}
		//user에는 모든 stock에 대한 illnessAlarm이 담겨 있음
	}
	
}
