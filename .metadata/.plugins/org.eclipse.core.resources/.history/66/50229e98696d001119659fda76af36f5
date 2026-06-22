package com.pharmacy.prescriptionservice.service;

import java.util.List;

import com.pharmacy.prescriptionservice.dto.PrescriptionRequest;
import com.pharmacy.prescriptionservice.dto.PrescriptionResponse;
import com.pharmacy.prescriptionservice.entity.PrescriptionStatus;

public interface PrescriptionService {

    PrescriptionResponse uploadPrescription(PrescriptionRequest prescriptionRequest);

    PrescriptionResponse getPrescriptionById(Long id);

    List<PrescriptionResponse> getPrescriptionsByCustomerId(Long customerId);

    List<PrescriptionResponse> getPrescriptionsByStatus(PrescriptionStatus status);

    PrescriptionResponse approvePrescription(Long id);

    PrescriptionResponse rejectPrescription(Long id);
}