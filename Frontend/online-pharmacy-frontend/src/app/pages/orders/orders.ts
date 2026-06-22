import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  standalone: false
})
export class Orders implements OnInit {

  orders: any[] = [];
  customerId = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();

    if (!this.customerId) {
      alert('Customer ID not found. Please login again.');
      return;
    }

    this.loadOrders();
  }

  loadOrders(): void {

    this.orderService.getOrdersByCustomerId(this.customerId).subscribe({

      next: (data: any[]) => {
        console.log('Customer Orders:', data);
        this.orders = data || [];
      },

      error: (error) => {
        console.log('Customer Orders Error:', error);
      }

    });
  }

  placeOrder(): void {

    this.orderService.placeOrder(this.customerId).subscribe({

      next: () => {
        alert('Order placed successfully');
        this.loadOrders();
      },

      error: (error) => {
        console.log('Order Error:', error);
        alert(error.error?.message || 'Order failed');
      }

    });
  }

  cancelOrder(orderId: number): void {

    this.orderService.cancelOrder(orderId).subscribe({

      next: () => {
        alert('Order cancelled successfully');
        this.loadOrders();
      },

      error: (error) => {
        console.log('Cancel Error:', error);
        alert(error.error?.message || 'Cancel failed');
      }

    });
  }

  getOrderId(order: any): any {
    return order.id || order.orderId || 'N/A';
  }
}