package com.team.chemical.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="illness")
@Data
@NoArgsConstructor
public class Illness {

    /**
     * 
     */
    private Integer illnessId;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private Integer period;

}