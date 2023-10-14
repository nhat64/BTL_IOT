package com.ducnhat.btliot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.ducnhat.btliot.model.StatusLed;
import com.ducnhat.btliot.mqtt.MqttService;
import com.ducnhat.btliot.repository.DataRepository;

@SpringBootApplication
public class BtliotApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(BtliotApplication.class, args);
		
		MqttService mqttService = context.getBean(MqttService.class);
		
		mqttService.doSub();
	}

}
