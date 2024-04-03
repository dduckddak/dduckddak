package com.ssafy.back.util;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.ssafy.back.talk.dto.MessageDto;
import com.ssafy.back.talk.dto.RunDto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AssistantAPI {
	private static final String DEFAULT_BASE_URL = "https://api.openai.com/v1";

	//사용자가 기본 thread가 없다면 생성
	public static String createThread(String openAIKey) {
		try {
			HttpResponse<String> response = Unirest.post(DEFAULT_BASE_URL + "/threads")
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + openAIKey)
				.header("OpenAI-Beta", "assistants=v1")
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();

			return json.get("id").getAsString();

		} catch (UnirestException e) {
			throw new RuntimeException("AssistantAPI 쓰레드 생성 실패");
		}
	}

	public static void sendMessage(String openAIKey, String threadId, String content) {
		Gson gson = new Gson();

		try {
			Unirest.post(DEFAULT_BASE_URL + "/threads/" + threadId + "/messages")
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + openAIKey)
				.header("OpenAI-Beta", "assistants=v1")
				.body(gson.toJson(new MessageDto(content)))
				.asString();

		} catch (UnirestException e) {
			throw new RuntimeException("AssistantAPI 메시지 전송 실패");
		}
	}

	public static String createRun(String openAIKey, String threadId, int bookId) {
		Gson gson = new Gson();
		String assistantId = null;

		//책별로 assistant 변경
		if (bookId == 121)
			assistantId = "asst_FYz7IdcHtb02Vb8y0yYxXjFI";

		if (bookId == 122)
			assistantId = "asst_agsbEFFUGyLqmeYnTrEFaLAl";

		if (bookId == 123)
			assistantId = "asst_o3hhlEh0ZLYdaYnAbPOzuNEW";

		try {
			HttpResponse<String> response = Unirest.post(DEFAULT_BASE_URL + "/threads/" + threadId + "/runs")
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + openAIKey)
				.header("OpenAI-Beta", "assistants=v1")
				.body(gson.toJson(new RunDto(assistantId)))
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();

			return json.get("id").getAsString();

		} catch (UnirestException e) {
			throw new RuntimeException("AssistantAPI Run 생성 실패");
		}
	}

	public static String checkRun(String openAIKey, String threadId, String runId) {
		try {
			HttpResponse<String> response = Unirest.get(DEFAULT_BASE_URL + "/threads/" + threadId + "/runs/" + runId)
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + openAIKey)
				.header("OpenAI-Beta", "assistants=v1")
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();

			return json.get("status").getAsString();

		} catch (Exception e) {
			throw new RuntimeException("AssistantAPI Run 체크 실패");
		}
	}

	public static String getMessage(String openAIKey, String threadId) {
		try {
			HttpResponse<String> response = Unirest.get(DEFAULT_BASE_URL + "/threads/" + threadId + "/messages")
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + openAIKey)
				.header("OpenAI-Beta", "assistants=v1")
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();
			JsonArray content = json.getAsJsonArray("data").get(0).getAsJsonObject().getAsJsonArray("content");
			JsonObject text = content.get(0).getAsJsonObject().getAsJsonObject("text");

			return text.get("value").getAsString();

		} catch (Exception e) {
			throw new RuntimeException("AssistantAPI 메시지 가져오기 실패");
		}
	}
}
