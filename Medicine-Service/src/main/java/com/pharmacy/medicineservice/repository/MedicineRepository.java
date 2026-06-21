package com.pharmacy.medicineservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pharmacy.medicineservice.entity.Medicine;
import com.pharmacy.medicineservice.entity.MedicineCategory;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByCategory(MedicineCategory category);

    List<Medicine> findByNameContainingIgnoreCase(String name);
}