package com.ducnhat.btliot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// class ánh xạ đến bảng lưu trữ lịch sử thiết bị
@Entity
@Table(name = "device")
public class Device {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name = "name_device")
	private String nameDevice;
	
	@Column(name = "status_device")
	private int statusDevice;
	
	@Column(name = "time_device")
	private String timeDevice;
	
	

	public Device() {
	}

	public Device(int id, String nameDevice, int statusDevice, String timeDevice) {
		this.id = id;
		this.nameDevice = nameDevice;
		this.statusDevice = statusDevice;
		this.timeDevice = timeDevice;
	}
	public Device(String nameDevice, int statusDevice, String timeDevice) {
		this.nameDevice = nameDevice;
		this.statusDevice = statusDevice;
		this.timeDevice = timeDevice;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNameDevice() {
		return nameDevice;
	}

	public void setNameDevice(String nameDevice) {
		this.nameDevice = nameDevice;
	}

	public int getStatusDevice() {
		return statusDevice;
	}

	public void setStatusDevice(int statusDevice) {
		this.statusDevice = statusDevice;
	}

	public String getTimeDevice() {
		return timeDevice;
	}

	public void setTimeDevice(String timeDevice) {
		this.timeDevice = timeDevice;
	}
	
	
	

}
