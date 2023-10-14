package com.ducnhat.btliot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ducnhat.btliot.model.Data;
import com.ducnhat.btliot.repository.DataRepository;

@RestController
@CrossOrigin
@RequestMapping(path = "/data")
public class DataCtl {
	
	@Autowired
	DataRepository dataRepository;
	
	@GetMapping("/all")
	public List<Data> getData() {
		return dataRepository.findAll();
	}
	
	@PostMapping("/update")
	public void update(@RequestBody Data data) {
		dataRepository.save(data);
	}
}
