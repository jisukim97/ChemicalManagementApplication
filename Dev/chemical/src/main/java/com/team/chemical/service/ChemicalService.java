package com.team.chemical.service;

import java.util.List;

import com.team.chemical.entity.ChemicalEntity;

public interface ChemicalService {
	
	void addChemical(int userID, ChemicalEntity chemicalEntity);
	
	List<ChemicalEntity> getChemicalList(int userID);

}
