package com.ssafy.back.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMTokenRequestDto {
    @NotBlank
    private String fcmToken;
}
