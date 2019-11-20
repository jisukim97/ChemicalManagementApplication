package com.team.chemical.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
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

	@OneToMany(mappedBy = "schedule")
    private Set<Schedule> schedules;
}