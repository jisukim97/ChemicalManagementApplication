package com.team.chemical.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.Apparatus;
import com.team.chemical.entity.ApparatusRepository;
import com.team.chemical.entity.Lab;
import com.team.chemical.entity.LabRepository;
import com.team.chemical.entity.Schedule;
import com.team.chemical.entity.ScheduleRepository;

/**
 * 
 * @author yeongmo
 * my Lab 기기 사용 관리 유스케이스
 */
@RestController
public class ApparatusController {

	@Autowired
	ApparatusRepository apparatusRepository;
	
	@Autowired
	LabRepository labRepository;
	
	@Autowired
	ScheduleRepository scheduleRepository;
	
	/**
	 * 기기 추가
	 * @param apparatus
	 * @param labId
	 * @return 추가된 기기
	 */
	@RequestMapping(value="/apparatus/{labId}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String addApparatus(@RequestBody Apparatus apparatus, @PathVariable int labId, HttpServletResponse response) {
		try {
			//lab 찾기 & 이름 겹치는게 있는지 찾아보기
			Lab findedLab = labRepository.findById(labId).get();
			for (Apparatus app : findedLab.getApparatus()) {
				if (app.getName().equals(apparatus.getName())) {
					throw new Exception("기기 이름 겹침");
				}
			}
			//기기 자체 등록
			Apparatus savedApparatus = apparatusRepository.save(apparatus);
			//lab에 추가
			findedLab.getApparatus().add(savedApparatus);
			labRepository.save(findedLab);
			return new ObjectMapper().writeValueAsString(savedApparatus);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 기기 삭제
	 * @param apparatus
	 * @param labId
	 * @return 추가된 기기
	 */
	@RequestMapping(value="/apparatus/{labId}/{apparatusId}", method=RequestMethod.DELETE, produces="text/plain;charset=UTF-8") 
	String deleteApparatus(@PathVariable int labId, @PathVariable int apparatusId, HttpServletResponse response) {
		try {
			//lab 찾기
			Lab findedLab = labRepository.findById(labId).get();
			//기기 찾기
			Apparatus findedApparatus = apparatusRepository.findById(apparatusId).get();
			//기기를 랩에서 삭제 후 저장
			findedLab.getApparatus().remove(findedApparatus);
			labRepository.save(findedLab);
			//기기 자체를 삭제
			apparatusRepository.delete(findedApparatus);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 해당 날짜의 예약 불러오기
	 * @param apparatus 기기
	 * @param date 날짜
	 * @return List of schedules
	 */
	private List<Schedule> getSchedulesAtDate(Apparatus apparatus, LocalDate date){
		List<Schedule> scheduleList = new LinkedList<>();
		for (Schedule schedule : apparatus.getSchedules()) {
			if (schedule.getDate().isEqual(date)) {
				scheduleList.add(schedule);
			}
		}
		return scheduleList;
	}
	
	/**
	 * 해당 기기의 해당 날짜의 리스트 받아오기
	 * @param apparatusId
	 * @return
	 */
	@RequestMapping(value="/schedule/{apparatusId}/{date}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getSchedules(@PathVariable int apparatusId, @PathVariable String date, HttpServletResponse response) {
		try {
			//날짜 파싱
			LocalDate reservDate = getDate(date);
			//기기 읽어오기
			Apparatus apparatus = apparatusRepository.findById(apparatusId).get();
			//해당 날짜의 예약 리스트 불러오기
			return new ObjectMapper().writeValueAsString(getSchedulesAtDate(apparatus, reservDate));
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	/**
	 * 기기 예약
	 * @param apparatusId
	 * @param date : YYMMDD형식
	 * @param startTime : HHMM 형식
	 * @param endTime : HHMM 형
	 * @return 해당 날짜의 스케줄 리스트
	 */
	@RequestMapping(value="/schedule/{apparatusId}/{date}/{startTime}/{endTime}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String makeReservation(@PathVariable int apparatusId, @PathVariable String date, @PathVariable String startTime, @PathVariable String endTime, HttpServletResponse response) {
		try {
			//예약 시간 파싱
			LocalDate reservDate = getDate(date);
			LocalTime reservStartTime = getTime(startTime);
			LocalTime reservEndTime = getTime(endTime);
			
			//겹치는 시간 있는거 찾기
			Apparatus apparatus = apparatusRepository.findById(apparatusId).get();
			for (Schedule alreadyReservated : apparatus.getSchedules()) {
				if (alreadyReservated.getDate().isEqual(reservDate)) {
					if ((alreadyReservated.getStartTime().isBefore(reservStartTime)&&reservEndTime.isBefore(alreadyReservated.getEndTime())) //원래시작 < 새거시작 < 새거끝 < 원래끝
							|| (alreadyReservated.getStartTime().isBefore(reservStartTime)&&reservStartTime.isBefore(alreadyReservated.getEndTime())) //원래시작 < 새거시작 < 원래끝
							|| (alreadyReservated.getStartTime().isBefore(reservEndTime)&&reservEndTime.isBefore(alreadyReservated.getEndTime())) //원래시작 < 새거끝 < 원래끝
							|| (reservStartTime.isBefore(alreadyReservated.getStartTime())&&alreadyReservated.getStartTime().isBefore(reservStartTime))//새거시작 < 원래시작 < 새거끝
							|| (reservStartTime.isBefore(alreadyReservated.getEndTime())&&alreadyReservated.getEndTime().isBefore(reservEndTime)) /*새거시작 < 원래끝 < 새거끝*/ ) {
						throw new Exception("시간 겹침");
					}
				}
			}
			//여기까지 오면 시간 안겹침
			Schedule newSchedule = new Schedule();
			newSchedule.setDate(reservDate);
			newSchedule.setStartTime(reservStartTime);
			newSchedule.setEndTime(reservEndTime);
			
			//스케줄 자체 저장
			newSchedule = scheduleRepository.save(newSchedule);
			//기기에 스케줄 할당
			apparatus.getSchedules().add(newSchedule);
			apparatusRepository.save(apparatus);
			
			//성공적으로 등록된 해당 날짜의 스케줄 리턴
			return new ObjectMapper().writeValueAsString(getSchedulesAtDate(apparatus, reservDate));
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}
	
	 /**
	  * 
	  * @param date YYMMDD형식을 LocalDate로
	  * @return LocalDate
	  */
	private LocalDate getDate(String date) {
		int year = Integer.parseInt(date.substring(0, 2)) + 2000;
		int month = Integer.parseInt(date.substring(2, 4));
		int day = Integer.parseInt(date.substring(4));
		LocalDate localDate = LocalDate.of(year, month, day);
		return localDate;
	}
	
	 /**
	  * 
	  * @param time HHMM형식을 LocalTime으로
	  * @return LocalTime
	  */
	private LocalTime getTime(String time) {
		int hour = Integer.parseInt(time.substring(0, 2));
		int min = Integer.parseInt(time.substring(2));
		LocalTime localTime = LocalTime.of(hour, min);
		return localTime;
	}
	
}
