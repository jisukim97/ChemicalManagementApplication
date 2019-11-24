package com.team.chemical.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
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
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
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
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab myLab;

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="user_stock",
    		joinColumns=@JoinColumn(name="user_id"),
    		inverseJoinColumns=@JoinColumn(name="stock_id"))
    @OrderColumn(name = "list_idx")
    private List<Stock> alarms;

    @OneToMany(mappedBy = "reservation")
    private Set<Schedule> schedules;

}