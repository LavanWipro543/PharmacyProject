import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.html',
  styleUrls: ['./all-orders.css'],
  standalone: false
})
export class AllOrders implements OnInit {

  orders: any[] = [];
  loading: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    this.loading = true;

    this.orderService.getAllOrders().subscribe({

      next: (response: any) => {

        console.log('All Orders Raw Response:', response);

        if (Array.isArray(response)) {
          this.orders = response;
        } else if (response && Array.isArray(response.data)) {
          this.orders = response.data;
        } else if (response && Array.isArray(response.content)) {
          this.orders = response.content;
        } else {
          this.orders = [];
        }

        console.log('Final Orders Array:', this.orders);

        this.loading = false;
      },

      error: (error) => {

        console.log('All Orders Error:', error);

        this.orders = [];
        this.loading = false;

        alert(error.error?.message || 'Failed to load all orders');
      }

    });
  }

  getOrderId(order: any): any {
    return order.id || order.orderId || order.order_id || 'N/A';
  }

  getCustomerId(order: any): any {
    return order.customerId || order.customer_id || 'N/A';
  }

  getTotalAmount(order: any): any {
    return order.totalAmount || order.grandTotal || order.amount || 0;
  }

  getStatus(order: any): any {
    return order.status || order.orderStatus || 'N/A';
  }

  getOrderDate(order: any): any {
    return order.orderDate || order.createdAt || order.date || 'N/A';
  }
}