package com.team.chemical.repository;

import org.springframework.data.repository.CrudRepository;

import com.team.chemical.entity.ChemicalEntity;

public interface ChemicalRepository extends CrudRepository<ChemicalEntity, Integer>{

}
