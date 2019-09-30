package com.team.chemical.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
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
			chemicalService.addChemical(userID, chemicalEntity);
			result.put("success", true);
			return new ObjectMapper().writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value="/chemical/list/{userID}", method=RequestMethod.GET, produces="text/plain;charset=UTF-8") 
	String getChemicalList(@PathVariable int userID, HttpServletResponse response) {
		try {
			List<ChemicalEntity> chemicalNameList = chemicalService.getChemicalList(userID);
			return new ObjectMapper().writeValueAsString(chemicalNameList);
		} catch (Exception e) {
			return null;
		}
	}
	
	@RequestMapping(value="/chemical/request", method=RequestMethod.GET, produces="text/plain;charset=UTF-8")
	String getPlaceRequest(HttpServletResponse response) {
		try {
			List<String> placeList = new ArrayList<String>();
			placeList.add("극저온냉장고");
			placeList.add("냉장고");
			placeList.add("실온시약장1");
			placeList.add("실온시약장2");
			placeList.add("인큐베이터");
			Collections.shuffle(placeList);
			String[] selectedPlace = new String[] {placeList.get(0), placeList.get(1), placeList.get(2)};
			return new ObjectMapper().writeValueAsString(selectedPlace);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
