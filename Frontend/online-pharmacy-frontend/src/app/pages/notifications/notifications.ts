import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
  standalone:false
})
export class Notifications implements OnInit {

  notifications: any[] = [];

  customerId = 1;

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {

    this.notificationService
      .getNotifications(this.customerId)
      .subscribe({

        next: (data: any) => {
          this.notifications = data;
        },

        error: (err) => {
          console.log(err);
        }

      });
  }
}