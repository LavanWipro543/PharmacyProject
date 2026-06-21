package com.pharmacy.cartservice.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private Long cartId;

    private Long customerId;

    private List<CartItemResponse> items;

    private Double grandTotal;
}