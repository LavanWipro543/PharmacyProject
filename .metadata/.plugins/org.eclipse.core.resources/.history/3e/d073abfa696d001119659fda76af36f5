package com.pharmacy.prescriptionservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pharmacy.prescriptionservice.dto.PrescriptionRequest;
import com.pharmacy.prescriptionservice.dto.PrescriptionResponse;
import com.pharmacy.prescriptionservice.entity.Prescription;
import com.pharmacy.prescriptionservice.entity.PrescriptionStatus;
import com.pharmacy.prescriptionservice.exception.PrescriptionNotFoundException;
import com.pharmacy.prescriptionservice.repository.PrescriptionRepository;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public PrescriptionResponse uploadPrescription(PrescriptionRequest prescriptionRequest) {

        Prescription prescription = new Prescription();
        prescription.setCustomerId(prescriptionRequest.getCustomerId());
        prescription.setDoctorName(prescriptionRequest.getDoctorName());
        prescription.setImageUrl(prescriptionRequest.getImageUrl());
        prescription.setStatus(PrescriptionStatus.PENDING);
        prescription.setUploadedDate(LocalDateTime.now());

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return mapToResponse(savedPrescription);
    }

    @Override
    public PrescriptionResponse getPrescriptionById(Long id) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new PrescriptionNotFoundException("Prescription not found with id: " + id));

        return mapToResponse(prescription);
    }

    @Override
    public List<PrescriptionResponse> getPrescriptionsByCustomerId(Long customerId) {

        return prescriptionRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PrescriptionResponse> getPrescriptionsByStatus(PrescriptionStatus status) {

        return prescriptionRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PrescriptionResponse approvePrescription(Long id) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new PrescriptionNotFoundException("Prescription not found with id: " + id));

        prescription.setStatus(PrescriptionStatus.APPROVED);

        Prescription updatedPrescription = prescriptionRepository.save(prescription);

        return mapToResponse(updatedPrescription);
    }

    @Override
    public PrescriptionResponse rejectPrescription(Long id) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new PrescriptionNotFoundException("Prescription not found with id: " + id));

        prescription.setStatus(PrescriptionStatus.REJECTED);

        Prescription updatedPrescription = prescriptionRepository.save(prescription);

        return mapToResponse(updatedPrescription);
    }

    private PrescriptionResponse mapToResponse(Prescription prescription) {

        return new PrescriptionResponse(
                prescription.getId(),
                prescription.getCustomerId(),
                prescription.getDoctorName(),
                prescription.getImageUrl(),
                prescription.getStatus(),
                prescription.getUploadedDate()
        );
    }
}