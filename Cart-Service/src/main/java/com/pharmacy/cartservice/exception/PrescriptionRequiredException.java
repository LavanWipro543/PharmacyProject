package com.pharmacy.cartservice.exception;

public class PrescriptionRequiredException extends RuntimeException {

    public PrescriptionRequiredException(String message) {
        super(message);
    }
}