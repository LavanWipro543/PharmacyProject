package com.pharmacy.medicineservice.dto;

import com.pharmacy.medicineservice.entity.MedicineCategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineResponse {

    private Long id;

    private String name;

    private String description;

    private Double price;

    private MedicineCategory category;

    private Boolean prescriptionRequired;
}