package com.pharmacy.prescriptionservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pharmacy.prescriptionservice.dto.PrescriptionRequest;
import com.pharmacy.prescriptionservice.dto.PrescriptionResponse;
import com.pharmacy.prescriptionservice.entity.PrescriptionStatus;
import com.pharmacy.prescriptionservice.service.PrescriptionService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/prescriptions")

@SecurityRequirement(name = "bearerAuth")

public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public ResponseEntity<PrescriptionResponse> uploadPrescription(
            @Valid @RequestBody PrescriptionRequest prescriptionRequest) {

        PrescriptionResponse response = prescriptionService.uploadPrescription(prescriptionRequest);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionResponse> getPrescriptionById(@PathVariable Long id) {

        PrescriptionResponse response = prescriptionService.getPrescriptionById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PrescriptionResponse>> getPrescriptionsByCustomerId(@PathVariable Long customerId) {

        List<PrescriptionResponse> response = prescriptionService.getPrescriptionsByCustomerId(customerId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PrescriptionResponse>> getPrescriptionsByStatus(@PathVariable PrescriptionStatus status) {

        List<PrescriptionResponse> response = prescriptionService.getPrescriptionsByStatus(status);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<PrescriptionResponse> approvePrescription(@PathVariable Long id) {

        PrescriptionResponse response = prescriptionService.approvePrescription(id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<PrescriptionResponse> rejectPrescription(@PathVariable Long id) {

        PrescriptionResponse response = prescriptionService.rejectPrescription(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testPrescriptionService() {

        return ResponseEntity.ok("Prescription Service is working successfully");
    }
}