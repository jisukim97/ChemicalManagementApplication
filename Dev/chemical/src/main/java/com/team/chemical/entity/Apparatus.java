package com.team.chemical.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="apparatus")
@Data
@NoArgsConstructor
public class Apparatus {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

	@Column
    private String name;

	@OneToMany(mappedBy = "schedule")
    private Set<Schedule> schedules;
}