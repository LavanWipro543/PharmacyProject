import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone:false
})
export class Profile implements OnInit {

  user = {
    name: '',
    email: '',
    role: ''
  };

  ngOnInit(): void {

    this.user.name =
      localStorage.getItem('name') || '';

    this.user.email =
      localStorage.getItem('email') || '';

    this.user.role =
      localStorage.getItem('role') || '';
  }

}