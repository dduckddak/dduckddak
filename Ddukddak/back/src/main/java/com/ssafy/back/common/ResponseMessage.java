package com.ssafy.back.common;

public interface ResponseMessage {
	String SUCCESS = "Success.";
	String VALIDATION_FAIL = "Validation failed.";

	String REFRESH_TOKEN_ERROR = "RefreshToken error.";

	String DUPLICATE = "Duplicate.";

	String DUPLICATE_ID = "Duplicate ID.";

	String SIGN_IN_FAIL = "Sign In Fail.";
	String LOGIN_IN_FAIL = "Login In Fail.";
	String LOGOUT_IN_FAIL = "Logout In Fail.";
	String CERTIFICATION_FAIL = "Certification failed.";

	String MAIL_FAIL = "Mail send failed.";
	String DATABASE_ERROR = "Database error.";

	String S3_ERROR = "S3 error.";

	String FastApi_ERROR = "FastApi error.";
	String ELEVENLABS_ERROR = "ElevenLabs error.";
	String FASTAPI_ERROR = "FastAPI error.";
	String GPT_ERROR = "Gpt error.";

}
