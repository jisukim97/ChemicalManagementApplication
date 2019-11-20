package com.team.chemical.entity;


import java.util.*;

import javax.persistence.Entity;
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
    private Set<User> members;

    /**
     * 
     */
    private Set<Inventory> inventories;

    /**
     * 
     */
    private Set<Apparatus> apparatus;

}