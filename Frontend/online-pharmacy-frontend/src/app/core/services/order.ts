import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/order-service/orders';

  constructor(private http: HttpClient) {}

  placeOrder(customerId: number): Observable<any> {
    return this.http.post<any>(
      this.baseUrl,
      {
        customerId: customerId
      }
    );
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getOrdersByCustomerId(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/customer/${customerId}`
    );
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${orderId}`
    );
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${orderId}/cancel`,
      {}
    );
  }
}