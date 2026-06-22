package com.pharmacy.cartservice.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.pharmacy.cartservice.dto.PrescriptionResponse;

@FeignClient(name = "PRESCRIPTION-SERVICE")
public interface PrescriptionClient {

    @GetMapping("/prescriptions/customer/{customerId}")
    List<PrescriptionResponse> getCustomerPrescriptions(
            @PathVariable Long customerId);
}