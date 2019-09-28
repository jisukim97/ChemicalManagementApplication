package com.chemical.repository;

import org.springframework.data.repository.CrudRepository;

import com.chemical.entity.ChemicalEntity;

public interface ChemicalRepository extends CrudRepository<ChemicalEntity, Integer>{

}
