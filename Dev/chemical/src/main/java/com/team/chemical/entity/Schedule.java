package com.team.chemical.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="schedule")
@Data
@NoArgsConstructor
public class Schedule {


    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private LocalDate date;

    /**
     * 
     */
    private LocalTime startTime;

    /**
     * 
     */
    private LocalTime endTime;

}