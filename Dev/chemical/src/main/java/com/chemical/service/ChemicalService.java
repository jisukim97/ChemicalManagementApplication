package com.chemical.service;

public interface ChemicalService {
	
	void addChemical(int userID, String chemicalName);
	
	String[] getChemicalList(int userID);

}
