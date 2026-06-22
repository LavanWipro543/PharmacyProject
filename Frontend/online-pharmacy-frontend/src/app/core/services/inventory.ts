import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://localhost:8080/inventory-service/inventory';

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addInventory(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateInventory(medicineId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${medicineId}`, data);
  }
}