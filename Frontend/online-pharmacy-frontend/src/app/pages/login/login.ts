import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.authService.login(this.loginData).subscribe({

      next: (response: any) => {

        console.log('Login Response:', response);

        this.authService.saveLoginData(response);

        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (response.role === 'PHARMACIST') {
          this.router.navigate(['/pharmacist/dashboard']);
        } else {
          this.router.navigate(['/customer/dashboard']);
        }
      },

      error: (error) => {
        console.log('Login Error:', error);
        alert('Invalid email or password');
      }

    });
  }
}