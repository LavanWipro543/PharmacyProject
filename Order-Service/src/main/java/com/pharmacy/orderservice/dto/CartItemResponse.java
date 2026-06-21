package com.pharmacy.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long medicineId;

    private String medicineName;

    private Double price;

    private Integer quantity;

    private Double totalPrice;
}