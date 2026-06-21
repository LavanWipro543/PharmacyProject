package com.pharmacy.apigateway.filter;

import java.nio.charset.StandardCharsets;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.pharmacy.apigateway.util.JwtUtil;

import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        String path = request.getURI().getPath();
        String method = request.getMethod() != null ? request.getMethod().name() : "";

        if (isPublicEndpoint(path)) {
            return chain.filter(exchange);
        }

        String authHeader = request.getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isTokenValid(token)) {
            return unauthorized(exchange, "Invalid or expired JWT token");
        }

        String role = jwtUtil.extractRole(token);
        String email = jwtUtil.extractEmail(token);

        if (!isAuthorized(path, method, role)) {
            return forbidden(exchange, "Access denied for role: " + role);
        }

        ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-Email", email)
                .header("X-User-Role", role)
                .build();

        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }

    private boolean isPublicEndpoint(String path) {

        String lowerPath = path.toLowerCase();

        return lowerPath.contains("/auth-service/auth/register")
                || lowerPath.contains("/auth-service/auth/login")
                || lowerPath.contains("/auth-service/auth/test")
                || lowerPath.contains("/actuator")
                || lowerPath.contains("/swagger-ui")
                || lowerPath.contains("/swagger-ui.html")
                || lowerPath.contains("/v3/api-docs")
                || lowerPath.contains("/webjars")
                || lowerPath.contains("/swagger-resources");
    }

    private boolean isAuthorized(String path, String method, String role) {

        if (role == null) {
            return false;
        }

        String normalizedRole = role.replace("ROLE_", "").trim().toUpperCase();

        if ("ADMIN".equals(normalizedRole)) {
            return true;
        }

        if ("CUSTOMER".equals(normalizedRole)) {
            return isCustomerAllowed(path, method);
        }

        if ("PHARMACIST".equals(normalizedRole)) {
            return isPharmacistAllowed(path);
        }

        return false;
    }

    private boolean isCustomerAllowed(String path, String method) {

        String lowerPath = path.toLowerCase();

        if (lowerPath.contains("/medicine-service/medicines") && "GET".equals(method)) {
            return true;
        }

        if (lowerPath.contains("/cart-service/cart/add") && "POST".equals(method)) {
            return true;
        }

        if (lowerPath.contains("/order-service/orders") && "POST".equals(method)) {
            return true;
        }

        if (lowerPath.contains("/order-service/orders") && "GET".equals(method)) {
            return true;
        }

        if (lowerPath.contains("/prescription-service/prescriptions") && "POST".equals(method)) {
            return true;
        }

        return false;
    }

    private boolean isPharmacistAllowed(String path) {

        String lowerPath = path.toLowerCase();

        return lowerPath.contains("/prescription-service/prescriptions");
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {

        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);

        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);

        return exchange.getResponse()
                .writeWith(Mono.just(exchange.getResponse()
                        .bufferFactory()
                        .wrap(bytes)));
    }

    private Mono<Void> forbidden(ServerWebExchange exchange, String message) {

        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);

        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);

        return exchange.getResponse()
                .writeWith(Mono.just(exchange.getResponse()
                        .bufferFactory()
                        .wrap(bytes)));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}