package com.ssafy.back.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomUserDetails {
    private int userSeq;
    private String userName;
    private String sex;
    private int birth;
    private int userId;
}

