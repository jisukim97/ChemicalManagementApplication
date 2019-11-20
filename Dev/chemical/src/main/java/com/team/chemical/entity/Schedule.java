package com.team.chemical.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

    /**
     * 
     */
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab myLab;
    
    /**
     * 
     */
    @ManyToOne
    @JoinColumn(name = "user")
    private User reservation;
}