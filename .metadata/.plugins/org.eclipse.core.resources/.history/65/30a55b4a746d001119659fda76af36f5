package com.pharmacy.orderservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.pharmacy.orderservice.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long orderId;

    private Long customerId;

    private List<OrderItemResponse> items;

    private Double totalAmount;

    private OrderStatus status;

    private LocalDateTime orderDate;
}