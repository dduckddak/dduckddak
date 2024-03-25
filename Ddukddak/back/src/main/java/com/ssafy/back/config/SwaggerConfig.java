package com.ssafy.back.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

	SecurityScheme bearerAuth = new SecurityScheme()
		.type(SecurityScheme.Type.HTTP)
		.scheme("bearer")
		.bearerFormat("JWT")
		.in(SecurityScheme.In.HEADER)
		.name(HttpHeaders.AUTHORIZATION);

	// Security 요청 설정
	SecurityRequirement addSecurityItem = new SecurityRequirement().addList("JWT");

	@Bean
	public OpenAPI openAPI() {
		Server localServer = new Server().url("http://localhost:8080").description("Local HTTP Server");
		Server httpsServer = new Server().url("http://j10e203.p.ssafy.io").description("Test HTTPS Server");
		return new OpenAPI()
			.servers(Arrays.asList(httpsServer, localServer))
			.components(new Components().addSecuritySchemes("JWT",bearerAuth))
			.addSecurityItem(addSecurityItem)
			.info(apiInfo());
	}

	private Info apiInfo() {
		return new Info()
			.title("뚝딱뚝딱 Swegger")
			.description("대규모 프로젝트.")
			.version("1.0.0");
	}
}