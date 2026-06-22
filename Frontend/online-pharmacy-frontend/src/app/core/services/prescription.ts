import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseUrl = 'http://localhost:8080/prescription-service/prescriptions';

  constructor(private http: HttpClient) {}

  uploadPrescription(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  getCustomerPrescriptions(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/customer/${customerId}`
    );
  }

  getPendingPrescriptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/status/PENDING`
    );
  }

  approvePrescription(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${id}/approve`,
      {}
    );
  }

  rejectPrescription(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${id}/reject`,
      {}
    );
  }
}