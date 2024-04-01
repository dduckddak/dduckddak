package com.ssafy.back.auth.service;

public interface FCMAlarmService {
	public String sendNotification(String token, String title, String body);
}
