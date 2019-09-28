package com.team.chemical.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="chemical")
@NoArgsConstructor
@Data
public class ChemicalEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Column
	private String name;
	
	@Column
	private String place;
	
	@Column
	private LocalDateTime putDate;
	
}
