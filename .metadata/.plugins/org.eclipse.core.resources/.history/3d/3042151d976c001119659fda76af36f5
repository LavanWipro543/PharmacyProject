package com.pharmacy.medicineservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pharmacy.medicineservice.dto.MedicineRequest;
import com.pharmacy.medicineservice.dto.MedicineResponse;
import com.pharmacy.medicineservice.entity.Medicine;
import com.pharmacy.medicineservice.entity.MedicineCategory;
import com.pharmacy.medicineservice.exception.MedicineNotFoundException;
import com.pharmacy.medicineservice.repository.MedicineRepository;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineServiceImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public MedicineResponse addMedicine(MedicineRequest medicineRequest) {

        Medicine medicine = new Medicine();
        medicine.setName(medicineRequest.getName());
        medicine.setDescription(medicineRequest.getDescription());
        medicine.setPrice(medicineRequest.getPrice());
        medicine.setCategory(medicineRequest.getCategory());
        medicine.setPrescriptionRequired(medicineRequest.getPrescriptionRequired());

        Medicine savedMedicine = medicineRepository.save(medicine);

        return mapToResponse(savedMedicine);
    }

    @Override
    public List<MedicineResponse> getAllMedicines() {

        return medicineRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MedicineResponse getMedicineById(Long id) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found with id: " + id));

        return mapToResponse(medicine);
    }

    @Override
    public List<MedicineResponse> getMedicinesByCategory(MedicineCategory category) {

        return medicineRepository.findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicineResponse> searchMedicinesByName(String name) {

        return medicineRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MedicineResponse updateMedicine(Long id, MedicineRequest medicineRequest) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found with id: " + id));

        medicine.setName(medicineRequest.getName());
        medicine.setDescription(medicineRequest.getDescription());
        medicine.setPrice(medicineRequest.getPrice());
        medicine.setCategory(medicineRequest.getCategory());
        medicine.setPrescriptionRequired(medicineRequest.getPrescriptionRequired());

        Medicine updatedMedicine = medicineRepository.save(medicine);

        return mapToResponse(updatedMedicine);
    }

    @Override
    public String deleteMedicine(Long id) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found with id: " + id));

        medicineRepository.delete(medicine);

        return "Medicine deleted successfully with id: " + id;
    }

    private MedicineResponse mapToResponse(Medicine medicine) {

        return new MedicineResponse(
                medicine.getId(),
                medicine.getName(),
                medicine.getDescription(),
                medicine.getPrice(),
                medicine.getCategory(),
                medicine.getPrescriptionRequired()
        );
    }
}