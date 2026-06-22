import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone:false,
  styleUrls: ['./register.css']
})
export class Register {

  registerData = {
    name: '',
    email: '',
    password: '',
    role: 'CUSTOMER'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    this.authService.register(this.registerData)
      .subscribe({
        next: () => {

          alert('Registration Successful');

          this.router.navigate(['/login']);
        },

        error: () => {
          alert('Registration Failed');
        }
      });
  }
}