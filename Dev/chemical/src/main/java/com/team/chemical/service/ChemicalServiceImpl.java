package com.team.chemical.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.chemical.entity.Chemical;
import com.team.chemical.entity.User;
import com.team.chemical.repository.ChemicalRepository;
import com.team.chemical.repository.UserRepository;

@Service
public class ChemicalServiceImpl implements ChemicalService{

	@Autowired
	ChemicalRepository chemicalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public void addChemical(int userID, Chemical chemical) {
		chemical.setPutDate(LocalDateTime.now());
		Chemical savedChemical = chemicalRepository.save(chemical);
		
		User user = userRepository.findById(userID);
		user.getChemicals().add(savedChemical);
		
		userRepository.save(user);
	}

	@Override
	public List<Chemical> getChemicalList(int userID) {
		User user = userRepository.findById(userID);
		List<Chemical> chemicals = user.getChemicals();
		return chemicals;
	}

}
