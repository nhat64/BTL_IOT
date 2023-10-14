package com.ducnhat.btliot.model;

public class StatusLed {
	private int led_1; // value 0 or 1
	private int led_2; // value 0 or 1
	private int isChanged; // value 1 or 2
	
	public StatusLed(int led_1, int led_2, int isChanged) {
		this.led_1 = led_1;
		this.led_2 = led_2;
		this.isChanged = isChanged;
	}

	public int getLed_1() {
		return led_1;
	}

	public void setLed_1(int led_1) {
		this.led_1 = led_1;
	}

	public int getLed_2() {
		return led_2;
	}

	public void setLed_2(int led_2) {
		this.led_2 = led_2;
	}

	public int getIsChanged() {
		return isChanged;
	}

	public void setIsChanged(int isChanged) {
		this.isChanged = isChanged;
	}
	
	
}
