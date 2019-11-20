package com.team.chemical.entity;


import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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