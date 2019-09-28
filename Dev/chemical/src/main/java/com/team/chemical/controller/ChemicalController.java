package com.team.chemical.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.chemical.entity.ChemicalEntity;
import com.team.chemical.service.ChemicalService;

@RestController
public class ChemicalController {

	@Autowired
	ChemicalService chemicalService;

	@RequestMapping(value="/chemical/add/{userID}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	String addChemical(@PathVariable int userID, @RequestBody ChemicalEntity chemicalEntity, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			chemicalService.addChemical(userID, chemicalEntity.getName());
			result.put("success", true);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value="/chemical/list/{userID}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getChemicalList(@PathVariable int userID, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String[] chemicalNameList = chemicalService.getChemicalList(userID);
			result.put("success", true);
			result.put("chemicalList", chemicalNameList);
			return new ObjectMapper().writeValueAsString(result);

		} catch (Exception e) {
			return null;
		}
	}

}
