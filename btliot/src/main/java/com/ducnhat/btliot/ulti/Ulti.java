package com.ducnhat.btliot.ulti;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Ulti {
	public static String getTimeNow() {
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		String timeNow = now.format(formatter);
		
		return timeNow;
	}
}
