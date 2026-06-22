import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone:false
})
export class Navbar {

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get role(): string {
    return localStorage.getItem('role') || '';
  }

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/login']);
  }

}