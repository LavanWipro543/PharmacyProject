package com.pharmacy.medicineservice.exception;

public class MedicineNotFoundException extends RuntimeException {

    public MedicineNotFoundException(String message) {
        super(message);
    }
}