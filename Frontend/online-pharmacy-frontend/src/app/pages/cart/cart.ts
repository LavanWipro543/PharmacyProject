import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  standalone: false
})
export class Cart implements OnInit {

  cart: any = null;
  customerId = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();

    if (!this.customerId) {
      alert('Customer ID not found. Please login again.');
      return;
    }

    this.loadCart();
  }

  loadCart(): void {

    this.cartService.getCart(this.customerId).subscribe({

      next: (data: any) => {
        console.log('Cart Response:', data);
        this.cart = data;
      },

      error: (error) => {
        console.log('Cart Error:', error);
        this.cart = null;
      }

    });
  }

  removeItem(medicineId: number): void {

    this.cartService.removeFromCart(this.customerId, medicineId).subscribe({

      next: () => {
        alert('Item removed');
        this.loadCart();
      },

      error: (error) => {
        console.log(error);
        alert(error.error?.message || 'Remove failed');
      }

    });
  }
}