import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../../core/services/medicine';
import { OrderService } from '../../../core/services/order';
import { InventoryService } from '../../../core/services/inventory';
import { PrescriptionService } from '../../../core/services/prescription';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: false
})
export class AdminDashboard implements OnInit {

  totalMedicines = 0;
  totalOrders = 0;
  totalInventory = 0;
  pendingPrescriptions = 0;

  loading = false;

  constructor(
    private medicineService: Medicine,
    private orderService: OrderService,
    private inventoryService: InventoryService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {

    this.loading = true;

    this.medicineService.getAllMedicines().subscribe({
      next: (data: any[]) => {
        this.totalMedicines = data ? data.length : 0;
      },
      error: (err) => {
        console.log('Medicines count error:', err);
      }
    });

    this.orderService.getAllOrders().subscribe({
      next: (data: any[]) => {
        this.totalOrders = data ? data.length : 0;
      },
      error: (err) => {
        console.log('Orders count error:', err);
      }
    });

    this.inventoryService.getAllInventory().subscribe({
      next: (data: any[]) => {
        this.totalInventory = data ? data.length : 0;
      },
      error: (err) => {
        console.log('Inventory count error:', err);
      }
    });

    this.prescriptionService.getPendingPrescriptions().subscribe({
      next: (data: any[]) => {
        this.pendingPrescriptions = data ? data.length : 0;
        this.loading = false;
      },
      error: (err) => {
        console.log('Pending prescriptions count error:', err);
        this.loading = false;
      }
    });
  }
}