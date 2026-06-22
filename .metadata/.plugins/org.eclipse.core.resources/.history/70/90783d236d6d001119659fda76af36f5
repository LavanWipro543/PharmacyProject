package com.pharmacy.inventoryservice.service;

import java.util.List;

import com.pharmacy.inventoryservice.dto.InventoryRequest;
import com.pharmacy.inventoryservice.dto.InventoryResponse;
import com.pharmacy.inventoryservice.dto.StockUpdateRequest;

public interface InventoryService {

    InventoryResponse addInventory(InventoryRequest inventoryRequest);

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryByMedicineId(Long medicineId);

    InventoryResponse updateInventory(Long medicineId, InventoryRequest inventoryRequest);

    InventoryResponse increaseStock(StockUpdateRequest stockUpdateRequest);

    InventoryResponse reduceStock(StockUpdateRequest stockUpdateRequest);

    Boolean checkStock(Long medicineId, Integer quantity);
}