package com.team.chemical.entity;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
//회원
public class User {
    /**
     * 
     */
	@Column
    private Integer id;

    /**
     * 
     */
	@Column
    private String name;

    /**
     * 
     */
	@Column
    private String email;

    /**
     * 
     */
	@Column
    private String password;

    /**
     * 
     */
	@Column
    private LocalDate labEnrollDate;

    /**
     * 
     */
	@Column
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab myLab;

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="lab_stock",
    		joinColumns=@JoinColumn(name="lab_id"),
    		inverseJoinColumns=@JoinColumn(name="stock_id"))
    private Set<Stock> alarms;

    /**
     * 
     */
	@OneToMany(mappedBy = "schedule")
    private Set<Schedule> scheduleList;
}