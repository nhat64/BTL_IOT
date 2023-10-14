package com.ducnhat.btliot.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;

public class MqttManager {
	
	private MqttClient client;
	
	public MqttManager(String brokerUrl, String clientId, String userName, String password) throws MqttException {
		
		this.client = new MqttClient(brokerUrl, clientId, null);
		MqttConnectOptions options = new MqttConnectOptions();
		options.setUserName(userName);
		options.setPassword(password.toCharArray());
		client.connect(options);
		
	}


	public void publish(String topic, String content) throws MqttPersistenceException, MqttException {
		MqttMessage message = new MqttMessage();
	    message.setPayload(content.getBytes());
	    message.setQos(1);
	    client.publish(topic, message);

	}
	
	public void subcribe(String topic, MqttCallback callback) throws MqttException {
		client.setCallback(callback);
		client.subscribe(topic);
	}
	
	
	public void disconnect() throws MqttException {
		this.client.disconnect();
	}
	public void close() throws MqttException {
		this.client.close();
	}

}
