package com.pharmacy.notificationservice.service;

import java.util.List;

import com.pharmacy.notificationservice.dto.NotificationRequest;
import com.pharmacy.notificationservice.dto.NotificationResponse;

public interface NotificationService {

    NotificationResponse sendNotification(NotificationRequest notificationRequest);

    List<NotificationResponse> getNotificationsByCustomerId(Long customerId);

    List<NotificationResponse> getAllNotifications();
}