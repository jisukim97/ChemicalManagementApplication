package com.team.chemical.entity;


import java.util.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="lab")
@Data
@NoArgsConstructor
public class Lab {

    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String password;

    /**
     * 
     */
	@OneToMany(mappedBy = "user")
    private Set<User> members;

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="lab_inventory",
    		joinColumns=@JoinColumn(name="lab_id"),
    		inverseJoinColumns=@JoinColumn(name="inventory_id"))
    private Set<Inventory> inventories;

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="lab_apparatus",
    		joinColumns=@JoinColumn(name="lab_id"),
    		inverseJoinColumns=@JoinColumn(name="apparatus_id"))
    private Set<Apparatus> apparatus;

}