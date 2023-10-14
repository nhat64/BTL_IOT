package com.ducnhat.btliot.model;

import java.util.Random;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// class liên kết đến bảng data lưu dữ liệu cảm biến
@Entity
@Table(name = "data")
public class Data {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name = "temperature")
	private float temperature;
	
	@Column(name = "humidity")
	private float humidity;
	
	@Column(name = "light")
	private float light;
	
	@Column(name = "time_data")
	private String timeData;
	
	@Column(name = "bui")
	private float bui;

	public Data() {
	}

	public Data(int id, float temperature, float humidity, float light, float bui, String timeData) {
		this.id = id;
		this.temperature = temperature;
		this.humidity = humidity;
		this.light = light;
		this.timeData = timeData;
		this.bui = bui;
	}
	public Data(float temperature, float humidity, float light, float bui, String timeData) {
		this.temperature = temperature;
		this.humidity = humidity;
		this.light = light;
		this.timeData = timeData;
		this.bui = bui;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getTemperature() {
		return temperature;
	}

	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}

	public float getHumidity() {
		return humidity;
	}

	public void setHumidity(float humidity) {
		this.humidity = humidity;
	}
	
	public float getBui() {
		return bui;
	}

	public void setBui(float bui) {
		this.bui = bui;
	}

	public float getLight() {
		return light;
	}

	public void setLight(float light) {
		this.light = light;
	}

	public String getTimeData() {
		return timeData;
	}

	public void setTimeData(String timeData) {
		this.timeData = timeData;
	}

	@Override
	public String toString() {
		return "Data [temperature=" + temperature + ", humidity=" + humidity + ", light=" + light + ", timeData="
				+ timeData + "]";
	}
	
	
	
	
}
