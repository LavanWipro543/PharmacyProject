package com.pharmacy.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.pharmacy.orderservice.dto.CartResponse;

@FeignClient(name = "CART-SERVICE")
public interface CartClient {

    @GetMapping("/cart/{customerId}")
    CartResponse getCartByCustomerId(@PathVariable Long customerId);

    @DeleteMapping("/cart/clear/{customerId}")
    String clearCart(@PathVariable Long customerId);
}