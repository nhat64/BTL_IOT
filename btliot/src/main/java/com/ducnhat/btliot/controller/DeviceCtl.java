package com.ducnhat.btliot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ducnhat.btliot.model.Device;
import com.ducnhat.btliot.model.StatusLed;
import com.ducnhat.btliot.mqtt.MqttService;
import com.ducnhat.btliot.repository.DeviceRepository;
import com.ducnhat.btliot.ulti.Ulti;

@RestController
@RequestMapping(path="/device")
@CrossOrigin
public class DeviceCtl {
	
	@Autowired
	DeviceRepository deviceRepository;
	
	@Autowired
	MqttService mqttService;
	
	@GetMapping("/all")
	public List<Device> getHistory(){
		return deviceRepository.findAll();
	}
	
	@PostMapping("/update")
	public void update(@RequestBody StatusLed statusLed) {

		if(statusLed.getIsChanged() == 1) {
			deviceRepository.save(new Device("led_1", statusLed.getLed_1(), Ulti.getTimeNow()));
		}else {
			deviceRepository.save(new Device("led_2", statusLed.getLed_2(), Ulti.getTimeNow()));
		}
		
		mqttService.doPub(statusLed);
	}
}
