package com.team.chemical.configuration;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.team.chemical.controller.AlarmController;

@Component
public class EverydayJob {
	
	@Autowired
	AlarmController alarmController;
	//매일 0시마다
	@Scheduled(cron = "0 0 8 * * ?")
    public void execute() throws Exception {
		System.out.println("알람 발생");
		alarmController.AlarmScheduling();
    	System.out.println("Reset Completed At");
    	System.out.println(LocalDateTime.now());
    	System.out.println("==================");
    }
}
