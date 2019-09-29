package com.team.chemical.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.chemical.entity.ChemicalEntity;
import com.team.chemical.entity.UserEntity;
import com.team.chemical.repository.ChemicalRepository;
import com.team.chemical.repository.UserRepository;

@Service
public class ChemicalServiceImpl implements ChemicalService{

	@Autowired
	ChemicalRepository chemicalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public void addChemical(int userID, String chemicalName) {
		// TODO Auto-generated method stub
		ChemicalEntity chemicalEntity = new ChemicalEntity();
		chemicalEntity.setName(chemicalName);
		chemicalEntity.setPlace("구역1");
		chemicalEntity.setPutDate(LocalDateTime.now());
		
		ChemicalEntity savedChemicalEntity = chemicalRepository.save(chemicalEntity);
		
		UserEntity userEntity = userRepository.findById(userID);
		userEntity.getChemicals().add(savedChemicalEntity);
		
		userRepository.save(userEntity);
		
	}

	@Override
	public String[] getChemicalList(int userID) {
		UserEntity userEntity = userRepository.findById(userID);
		List<ChemicalEntity> chemicals = userEntity.getChemicals();
		String[] chemicalNameArray = new String[chemicals.size()];
		for (int i=0; i<chemicalNameArray.length; i++) {
			chemicalNameArray[i] = chemicals.get(i).getName();
		}
		
		return chemicalNameArray;
	}

}
