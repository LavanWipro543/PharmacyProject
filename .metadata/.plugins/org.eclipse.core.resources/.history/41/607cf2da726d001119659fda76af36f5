package com.pharmacy.notificationservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pharmacy.notificationservice.dto.NotificationRequest;
import com.pharmacy.notificationservice.dto.NotificationResponse;
import com.pharmacy.notificationservice.entity.Notification;
import com.pharmacy.notificationservice.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public NotificationResponse sendNotification(NotificationRequest notificationRequest) {

        Notification notification = new Notification();
        notification.setCustomerId(notificationRequest.getCustomerId());
        notification.setMessage(notificationRequest.getMessage());
        notification.setCreatedAt(LocalDateTime.now());

        Notification savedNotification = notificationRepository.save(notification);

        return mapToResponse(savedNotification);
    }

    @Override
    public List<NotificationResponse> getNotificationsByCustomerId(Long customerId) {

        return notificationRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationResponse> getAllNotifications() {

        return notificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NotificationResponse mapToResponse(Notification notification) {

        return new NotificationResponse(
                notification.getId(),
                notification.getCustomerId(),
                notification.getMessage(),
                notification.getCreatedAt()
        );
    }
}