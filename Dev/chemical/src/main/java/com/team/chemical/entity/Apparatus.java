package com.team.chemical.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="apparatus")
@Data
@NoArgsConstructor
public class Apparatus {

    private Integer id;

    private String name;

}