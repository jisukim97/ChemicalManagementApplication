package com.team.chemical.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.chemical.service.ChemicalService;

@RestController
public class ChemicalController {
	
	@Autowired
	ChemicalService chemicalService;
	
	@RequestMapping(value="/chemical/add/{userID}", method=RequestMethod.POST, produces="text/plain;charset=UTF-8") 
	Map<String, Object> addChemical(@PathVariable int userID, @RequestParam("chemicalName") String chemicalName, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		chemicalService.addChemical(userID, chemicalName);
		result.put("success", true);
		return result;
	}
	
	@RequestMapping(value="/chemical/list/{userID}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	Map<String, Object> getChemicalList(@PathVariable int userID, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String[] chemicalNameList = chemicalService.getChemicalList(userID);
		result.put("success", true);
		result.put("chemicalList", chemicalNameList);
		return result;
	}

}
