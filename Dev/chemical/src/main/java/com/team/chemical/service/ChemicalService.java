package com.team.chemical.service;

import java.util.List;

import com.team.chemical.entity.Chemical;

public interface ChemicalService {
	
	void addChemical(int userID, Chemical chemical);
	
	List<Chemical> getChemicalList(int userID);

}
