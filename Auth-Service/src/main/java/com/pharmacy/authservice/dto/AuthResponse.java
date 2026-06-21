package com.pharmacy.authservice.dto;

import com.pharmacy.authservice.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private String tokenType;

    private Long userId;

    private String name;

    private String email;

    private Role role;
}
