package com.ssafy.back.auth.filter;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.auth.provider.JwtProvider;
import com.ssafy.back.exception.CustomJwtException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor // 필수 요소에 대한 생성자를 만들어줌
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String token = parseBearerToken(request);

            if(token == null) {
                filterChain.doFilter(request,response);
                return;
            }

            Jws<Claims> parsedToken = jwtProvider.validateToken(token);

            int userSeq = parsedToken.getBody().get("userSeq", Integer.class);
            String userName = parsedToken.getBody().get("userName", String.class);
            String sex = parsedToken.getBody().get("sex", String.class);
            int birth = parsedToken.getBody().get("birth", Integer.class);
            int userId = parsedToken.getBody().get("userId", Integer.class);


            CustomUserDetails customUserDetails = new CustomUserDetails(userSeq,userName,sex,birth,userId);

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            AbstractAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(customUserDetails, null, Collections.emptyList());// 1: 유저정보
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);
        }
        catch (CustomJwtException e){
            throw new CustomJwtException(e.getMessage(),e);
        }

        filterChain.doFilter(request,response); // 다음 필터로 넘어가도록 만들어줌
    }

    private String parseBearerToken(HttpServletRequest request){// request 객체부터 token 값을 가져옴
        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);// 실제고 값이 Text 가 존재하는지 찾아즘 = hasText
        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
