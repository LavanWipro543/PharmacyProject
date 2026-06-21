package com.pharmacy.orderservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pharmacy.orderservice.dto.OrderRequest;
import com.pharmacy.orderservice.dto.OrderResponse;
import com.pharmacy.orderservice.entity.OrderStatus;
import com.pharmacy.orderservice.service.OrderService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/orders")

@SecurityRequirement(name = "bearerAuth")

public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {

        OrderResponse response = orderService.placeOrder(orderRequest);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long orderId) {

        OrderResponse response = orderService.getOrderById(orderId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByCustomerId(@PathVariable Long customerId) {

        List<OrderResponse> response = orderService.getOrdersByCustomerId(customerId);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        List<OrderResponse> response = orderService.getAllOrders();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}/status/{status}")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long orderId,
                                                           @PathVariable OrderStatus status) {

        OrderResponse response = orderService.updateOrderStatus(orderId, status);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long orderId) {

        OrderResponse response = orderService.cancelOrder(orderId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testOrderService() {

        return ResponseEntity.ok("Order Service is working successfully");
    }
}