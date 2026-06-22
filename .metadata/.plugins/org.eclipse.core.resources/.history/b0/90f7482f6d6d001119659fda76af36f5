package com.pharmacy.inventoryservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pharmacy.inventoryservice.dto.InventoryRequest;
import com.pharmacy.inventoryservice.dto.InventoryResponse;
import com.pharmacy.inventoryservice.dto.StockUpdateRequest;
import com.pharmacy.inventoryservice.entity.Inventory;
import com.pharmacy.inventoryservice.exception.InsufficientStockException;
import com.pharmacy.inventoryservice.exception.InventoryNotFoundException;
import com.pharmacy.inventoryservice.repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse addInventory(InventoryRequest inventoryRequest) {

        if (inventoryRepository.existsByMedicineId(inventoryRequest.getMedicineId())) {
            throw new RuntimeException("Inventory already exists for medicine id: " + inventoryRequest.getMedicineId());
        }

        Inventory inventory = new Inventory();
        inventory.setMedicineId(inventoryRequest.getMedicineId());
        inventory.setAvailableQuantity(inventoryRequest.getAvailableQuantity());
        inventory.setReorderLevel(inventoryRequest.getReorderLevel());

        Inventory savedInventory = inventoryRepository.save(inventory);

        return mapToResponse(savedInventory);
    }

    @Override
    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryResponse getInventoryByMedicineId(Long medicineId) {

        Inventory inventory = inventoryRepository.findByMedicineId(medicineId)
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found for medicine id: " + medicineId));

        return mapToResponse(inventory);
    }

    @Override
    public InventoryResponse updateInventory(Long medicineId, InventoryRequest inventoryRequest) {

        Inventory inventory = inventoryRepository.findByMedicineId(medicineId)
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found for medicine id: " + medicineId));

        inventory.setMedicineId(inventoryRequest.getMedicineId());
        inventory.setAvailableQuantity(inventoryRequest.getAvailableQuantity());
        inventory.setReorderLevel(inventoryRequest.getReorderLevel());

        Inventory updatedInventory = inventoryRepository.save(inventory);

        return mapToResponse(updatedInventory);
    }

    @Override
    public InventoryResponse increaseStock(StockUpdateRequest stockUpdateRequest) {

        Inventory inventory = inventoryRepository.findByMedicineId(stockUpdateRequest.getMedicineId())
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found for medicine id: " + stockUpdateRequest.getMedicineId()));

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() + stockUpdateRequest.getQuantity());

        Inventory updatedInventory = inventoryRepository.save(inventory);

        return mapToResponse(updatedInventory);
    }

    @Override
    public InventoryResponse reduceStock(StockUpdateRequest stockUpdateRequest) {

        Inventory inventory = inventoryRepository.findByMedicineId(stockUpdateRequest.getMedicineId())
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found for medicine id: " + stockUpdateRequest.getMedicineId()));

        if (inventory.getAvailableQuantity() < stockUpdateRequest.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock for medicine id: " + stockUpdateRequest.getMedicineId());
        }

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - stockUpdateRequest.getQuantity());

        Inventory updatedInventory = inventoryRepository.save(inventory);

        return mapToResponse(updatedInventory);
    }

    @Override
    public Boolean checkStock(Long medicineId, Integer quantity) {

        Inventory inventory = inventoryRepository.findByMedicineId(medicineId)
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found for medicine id: " + medicineId));

        return inventory.getAvailableQuantity() >= quantity;
    }

    private InventoryResponse mapToResponse(Inventory inventory) {

        Boolean lowStock = inventory.getAvailableQuantity() <= inventory.getReorderLevel();

        return new InventoryResponse(
                inventory.getId(),
                inventory.getMedicineId(),
                inventory.getAvailableQuantity(),
                inventory.getReorderLevel(),
                lowStock
        );
    }
}