package com.pharmacy.orderservice.service;

import java.util.List;

import com.pharmacy.orderservice.dto.OrderRequest;
import com.pharmacy.orderservice.dto.OrderResponse;
import com.pharmacy.orderservice.entity.OrderStatus;

public interface OrderService {

    OrderResponse placeOrder(OrderRequest orderRequest);

    OrderResponse getOrderById(Long orderId);

    List<OrderResponse> getOrdersByCustomerId(Long customerId);

    List<OrderResponse> getAllOrders();

    OrderResponse updateOrderStatus(Long orderId, OrderStatus status);

    OrderResponse cancelOrder(Long orderId);
}