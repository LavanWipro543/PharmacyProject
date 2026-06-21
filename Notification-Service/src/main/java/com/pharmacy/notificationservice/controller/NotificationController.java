package com.pharmacy.notificationservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pharmacy.notificationservice.dto.NotificationRequest;
import com.pharmacy.notificationservice.dto.NotificationResponse;
import com.pharmacy.notificationservice.service.NotificationService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/notifications")

@SecurityRequirement(name = "bearerAuth")

public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send")
    public ResponseEntity<NotificationResponse> sendNotification(
            @Valid @RequestBody NotificationRequest notificationRequest) {

        NotificationResponse response = notificationService.sendNotification(notificationRequest);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<NotificationResponse>> getNotificationsByCustomerId(@PathVariable Long customerId) {

        List<NotificationResponse> response = notificationService.getNotificationsByCustomerId(customerId);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {

        List<NotificationResponse> response = notificationService.getAllNotifications();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testNotificationService() {

        return ResponseEntity.ok("Notification Service is working successfully");
    }
}