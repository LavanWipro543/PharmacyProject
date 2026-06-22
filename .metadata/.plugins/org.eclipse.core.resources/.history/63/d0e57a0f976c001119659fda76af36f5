package com.pharmacy.medicineservice.service;

import java.util.List;

import com.pharmacy.medicineservice.dto.MedicineRequest;
import com.pharmacy.medicineservice.dto.MedicineResponse;
import com.pharmacy.medicineservice.entity.MedicineCategory;

public interface MedicineService {

    MedicineResponse addMedicine(MedicineRequest medicineRequest);

    List<MedicineResponse> getAllMedicines();

    MedicineResponse getMedicineById(Long id);

    List<MedicineResponse> getMedicinesByCategory(MedicineCategory category);

    List<MedicineResponse> searchMedicinesByName(String name);

    MedicineResponse updateMedicine(Long id, MedicineRequest medicineRequest);

    String deleteMedicine(Long id);
}