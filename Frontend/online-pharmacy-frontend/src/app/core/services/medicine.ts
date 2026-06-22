import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Medicine{

  private baseUrl = 'http://localhost:8080/medicine-service/medicines';

  constructor(private http: HttpClient) {}

  getAllMedicines(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addMedicine(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateMedicine(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteMedicine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}