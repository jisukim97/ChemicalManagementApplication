package com.team.chemical.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    /**
     * 
     */
	@Column
    private LocalDate date;

    /**
     * 
     */
	@Column
    private LocalTime startTime;

    /**
     * 
     */
	@Column
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
}