import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../../core/services/prescription';

@Component({
  selector: 'app-prescription-management',
  templateUrl: './prescription-management.html',
  styleUrls: ['./prescription-management.css'],
  standalone:false
})
export class PrescriptionManagement implements OnInit {

  prescriptions: any[] = [];

  constructor(
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {

    this.prescriptionService
      .getPendingPrescriptions()
      .subscribe({

        next: (data: any) => {
          this.prescriptions = data;
        }

      });
  }

  approve(id: number): void {

    this.prescriptionService
      .approvePrescription(id)
      .subscribe({

        next: () => {

          alert('Prescription Approved');

          this.loadPrescriptions();
        }

      });
  }

  reject(id: number): void {

    this.prescriptionService
      .rejectPrescription(id)
      .subscribe({

        next: () => {

          alert('Prescription Rejected');

          this.loadPrescriptions();
        }

      });
  }
}