package com.team.chemical.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="apparatus")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Apparatus {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

	@Column
    private String name;

	@OneToMany(mappedBy = "apparatus")
	@JsonManagedReference("apparatusSchedule")
    private Set<Schedule> schedules = new HashSet<>();

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Apparatus other = (Apparatus) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	/**
	 * 해당 날짜의 예약 불러오기
	 * @param apparatus 기기
	 * @param date 날짜
	 * @return List of schedules
	 */
	public static List<Schedule> getSchedulesAtDate(Apparatus apparatus, LocalDate date){
		List<Schedule> scheduleList = new LinkedList<>();
		for (Schedule schedule : apparatus.getSchedules()) {
			if (schedule.getDate().isEqual(date)) {
				scheduleList.add(schedule);
			}
		}
		return scheduleList;
	}
	
	
	 /**
	  * 
	  * @param date YYMMDD형식을 LocalDate로
	  * @return LocalDate
	  */
	public static LocalDate getDate(String date) {
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
	public static LocalTime getTime(String time) {
		int hour = Integer.parseInt(time.substring(0, 2));
		int min = Integer.parseInt(time.substring(2));
		LocalTime localTime = LocalTime.of(hour, min);
		return localTime;
	}
	
	public static void isConflictTime(Apparatus apparatus, LocalDate reservDate, LocalTime reservStartTime, LocalTime reservEndTime) throws Exception{
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
	}
}
