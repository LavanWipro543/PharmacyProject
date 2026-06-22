import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl =
    'http://localhost:8080/notification-service/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(customerId: number) {
    return this.http.get(
      `${this.baseUrl}/customer/${customerId}`
    );
  }
}