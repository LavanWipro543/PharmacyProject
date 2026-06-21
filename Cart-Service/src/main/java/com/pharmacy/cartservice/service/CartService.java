package com.pharmacy.cartservice.service;

import com.pharmacy.cartservice.dto.CartRequest;
import com.pharmacy.cartservice.dto.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest cartRequest);

    CartResponse updateCartItem(CartRequest cartRequest);

    String removeFromCart(Long customerId, Long medicineId);

    CartResponse getCartByCustomerId(Long customerId);

    String clearCart(Long customerId);
}