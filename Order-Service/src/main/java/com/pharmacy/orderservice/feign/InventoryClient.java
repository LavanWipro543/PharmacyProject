package com.pharmacy.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.pharmacy.orderservice.dto.StockUpdateRequest;

@FeignClient(name = "INVENTORY-SERVICE")
public interface InventoryClient {

    @PutMapping("/inventory/reduce-stock")
    Object reduceStock(@RequestBody StockUpdateRequest stockUpdateRequest);
}