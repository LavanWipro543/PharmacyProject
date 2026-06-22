import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/cart-service/cart';

  constructor(private http: HttpClient) {}

  addToCart(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/add`,
      data
    );
  }

  getCart(customerId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${customerId}`
    );
  }

  clearCart(customerId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/clear/${customerId}`
    );
  }

  removeFromCart(customerId: number, medicineId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/remove/${customerId}/${medicineId}`
    );
  }
}