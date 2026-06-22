import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth-service/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  saveLoginData(response: any): void {
    localStorage.setItem('token', response.token || '');
    localStorage.setItem('role', response.role || '');
    localStorage.setItem('email', response.email || '');
    localStorage.setItem('name', response.name || '');
    localStorage.setItem('customerId', String(response.userId || response.customerId || response.id || ''));
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getCustomerId(): number {
    return Number(localStorage.getItem('customerId'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }
}