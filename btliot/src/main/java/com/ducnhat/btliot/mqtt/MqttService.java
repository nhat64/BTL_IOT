package com.ducnhat.btliot.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ducnhat.btliot.model.Data;
import com.ducnhat.btliot.model.StatusLed;
import com.ducnhat.btliot.repository.DataRepository;
import com.ducnhat.btliot.ulti.Ulti;

@Service
public class MqttService {
	
	@Autowired
	SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	DataRepository dataRepository;
	
	private String brokerUrl = "tcp://localhost:1883";
	// mỗi một mqttclient được tạo ra phải có một id riêng biệt, không trùng
	private String clientIdDht = "client_dht";
	private String clientIdLed = "client_led";
	private String userName = "duc_nhat";
	private String password = "123456";
	
	private String topicDht = "esp/dht";
	private String topicLed = "esp/led";
	
	private MqttManager mqttManagerDht;
	private MqttManager mqttManagerLed;
	
	public MqttService() {
		try {
			mqttManagerDht = new MqttManager(brokerUrl, clientIdDht, userName, password);
			mqttManagerLed = new MqttManager(brokerUrl, clientIdLed, userName, password);
		} catch (MqttException e) {
			System.out.println("sau gì đó ở phần khời tạo mqttManager này");
			e.printStackTrace();
		}
	}
	
	public void doPub(StatusLed statusLed) {
		// chỉ có pub thông tin đèn led thôi
		// pub một string dạng "led_1 x led_2 y" x và y có thể là 1 hoặc 0
		
		String content = "led_1 " + statusLed.getLed_1() + " led_2 " + statusLed.getLed_2();
		
		System.out.println("backend pub thông tin led: " + content);
		
		try {
			mqttManagerLed.publish(topicLed, content);
		} catch (MqttPersistenceException e) {
			e.printStackTrace();
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}
	
	public void doSub() {
		// sub broker dht
		try {
			mqttManagerDht.subcribe(topicDht, new MqttCallback() {

				@Override
				public void messageArrived(String topic, MqttMessage message) throws Exception {
					String tmp = new String(message.getPayload());
					System.out.println("esp gửi thông tin cảm biến: " + tmp);
					// save và gửi mess cho font end
					saveDataDht(tmp);
				}
				@Override
				public void deliveryComplete(IMqttDeliveryToken token) {}
				@Override
				public void connectionLost(Throwable cause) {}
			});
		} catch (MqttException e) {
			e.printStackTrace();
		}
		// sub broker led
		try {
			mqttManagerLed.subcribe(topicLed, new MqttCallback() {

				@Override
				public void messageArrived(String topic, MqttMessage message) throws Exception {
					String tmp = new String(message.getPayload());
					// bên chip esp đã được quy định đặt một xâu "check" ở đằng trước
					//chúng ta chỉ xử lý tin nhắn sub từ phía esp để hồi đáp font-end nên phải đặt chữ kí để kiểm tra
					if (tmp.startsWith("check")) {
						System.out.println("esp gửi thông tin led: " + tmp);
						
						// gửi thống tin đèn cho font end
						sendDataLed(tmp);
					}
				}
				@Override
				public void deliveryComplete(IMqttDeliveryToken token) {}
				@Override
				public void connectionLost(Throwable cause) {}
			});
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}
	
	private void saveDataDht(String tmp) {
		//tmp dạng "temperature 33.80 humidity 70.00 light 500"
		String[] list = tmp.split(" ");
		String timeNow = Ulti.getTimeNow();

		Data data = new Data(Float.valueOf(list[1]), Float.valueOf(list[3]), Float.valueOf(list[5]), Float.valueOf(list[7]),
				timeNow);

		try {
			dataRepository.save(data);
			messagingTemplate.convertAndSend("/topic/dht", data);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private void sendDataLed(String tmp) {
		//tmp: "check led_1 0 led_2 0"
		String[] list = tmp.split(" ");
		StatusLed statusLed = new StatusLed(Integer.valueOf(list[2]), Integer.valueOf(list[4]), 1);
		
		try {
			messagingTemplate.convertAndSend("/topic/led", statusLed);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
