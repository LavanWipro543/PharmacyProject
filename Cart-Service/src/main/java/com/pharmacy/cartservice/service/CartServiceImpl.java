package com.pharmacy.cartservice.service;
import com.pharmacy.cartservice.dto.PrescriptionResponse;
import com.pharmacy.cartservice.exception.PrescriptionRequiredException;
import com.pharmacy.cartservice.feign.PrescriptionClient;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pharmacy.cartservice.dto.CartItemResponse;
import com.pharmacy.cartservice.dto.CartRequest;
import com.pharmacy.cartservice.dto.CartResponse;
import com.pharmacy.cartservice.dto.MedicineResponse;
import com.pharmacy.cartservice.entity.Cart;
import com.pharmacy.cartservice.entity.CartItem;
import com.pharmacy.cartservice.exception.CartNotFoundException;
import com.pharmacy.cartservice.feign.MedicineClient;
import com.pharmacy.cartservice.repository.CartRepository;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MedicineClient medicineClient;
    private final PrescriptionClient prescriptionClient;

    public CartServiceImpl(CartRepository cartRepository, MedicineClient medicineClient,PrescriptionClient prescriptionClient) {
        this.cartRepository = cartRepository;
        this.medicineClient = medicineClient;
		this.prescriptionClient = prescriptionClient;
    }

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {

        MedicineResponse medicine = medicineClient.getMedicineById(cartRequest.getMedicineId());
        if (Boolean.TRUE.equals(medicine.getPrescriptionRequired())) {

            List<PrescriptionResponse> prescriptions =
                    prescriptionClient.getCustomerPrescriptions(
                            cartRequest.getCustomerId());

            boolean approved = prescriptions.stream()
                    .anyMatch(p ->
                            "APPROVED".equalsIgnoreCase(
                                    p.getStatus()));

            if (!approved) {

                throw new PrescriptionRequiredException(
                        "Approved prescription required before adding this medicine to cart");
            }
        }

        Cart cart = cartRepository.findByCustomerId(cartRequest.getCustomerId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomerId(cartRequest.getCustomerId());
                    return newCart;
                });

        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(item -> item.getMedicineId().equals(cartRequest.getMedicineId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + cartRequest.getQuantity());
            item.setTotalPrice(item.getPrice() * item.getQuantity());
        } else {
            CartItem item = new CartItem();
            item.setMedicineId(medicine.getId());
            item.setMedicineName(medicine.getName());
            item.setPrice(medicine.getPrice());
            item.setQuantity(cartRequest.getQuantity());
            item.setTotalPrice(medicine.getPrice() * cartRequest.getQuantity());
            item.setCart(cart);

            cart.getItems().add(item);
        }

        Cart savedCart = cartRepository.save(cart);

        return mapToResponse(savedCart);
    }

    @Override
    public CartResponse updateCartItem(CartRequest cartRequest) {

        Cart cart = cartRepository.findByCustomerId(cartRequest.getCustomerId())
                .orElseThrow(() -> new CartNotFoundException("Cart not found for customer id: " + cartRequest.getCustomerId()));

        CartItem item = cart.getItems()
                .stream()
                .filter(cartItem -> cartItem.getMedicineId().equals(cartRequest.getMedicineId()))
                .findFirst()
                .orElseThrow(() -> new CartNotFoundException("Medicine not found in cart with id: " + cartRequest.getMedicineId()));

        item.setQuantity(cartRequest.getQuantity());
        item.setTotalPrice(item.getPrice() * cartRequest.getQuantity());

        Cart savedCart = cartRepository.save(cart);

        return mapToResponse(savedCart);
    }

    @Override
    public String removeFromCart(Long customerId, Long medicineId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for customer id: " + customerId));

        boolean removed = cart.getItems().removeIf(item -> item.getMedicineId().equals(medicineId));

        if (!removed) {
            throw new CartNotFoundException("Medicine not found in cart with id: " + medicineId);
        }

        cartRepository.save(cart);

        return "Medicine removed from cart successfully";
    }

    @Override
    public CartResponse getCartByCustomerId(Long customerId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for customer id: " + customerId));

        return mapToResponse(cart);
    }

    @Override
    public String clearCart(Long customerId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for customer id: " + customerId));

        cart.getItems().clear();

        cartRepository.save(cart);

        return "Cart cleared successfully for customer id: " + customerId;
    }

    private CartResponse mapToResponse(Cart cart) {

        List<CartItemResponse> itemResponses = cart.getItems()
                .stream()
                .map(item -> new CartItemResponse(
                        item.getMedicineId(),
                        item.getMedicineName(),
                        item.getPrice(),
                        item.getQuantity(),
                        item.getTotalPrice()
                ))
                .collect(Collectors.toList());

        Double grandTotal = cart.getItems()
                .stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();

        return new CartResponse(
                cart.getId(),
                cart.getCustomerId(),
                itemResponses,
                grandTotal
        );
    }
}