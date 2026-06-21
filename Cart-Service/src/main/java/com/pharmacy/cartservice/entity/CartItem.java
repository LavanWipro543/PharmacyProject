package com.pharmacy.cartservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long medicineId;

    private String medicineName;

    private Double price;

    private Integer quantity;

    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
}