package com.pharmacy.prescriptionservice.exception;

public class PrescriptionNotFoundException extends RuntimeException {

    public PrescriptionNotFoundException(String message) {
        super(message);
    }
}