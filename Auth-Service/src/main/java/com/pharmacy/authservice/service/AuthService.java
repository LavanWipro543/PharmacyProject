package com.pharmacy.authservice.service;

import com.pharmacy.authservice.dto.AuthResponse;
import com.pharmacy.authservice.dto.LoginRequest;
import com.pharmacy.authservice.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);
}