package com.pharmacy.prescriptionservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Customer id is required")
    @Column(nullable = false)
    private Long customerId;

    @NotBlank(message = "Doctor name is required")
    @Column(nullable = false)
    private String doctorName;

    @NotBlank(message = "Prescription image URL is required")
    @Column(nullable = false)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrescriptionStatus status;

    @Column(nullable = false)
    private LocalDateTime uploadedDate;
}