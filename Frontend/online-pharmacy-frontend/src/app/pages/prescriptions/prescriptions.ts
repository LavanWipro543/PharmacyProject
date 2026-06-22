import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../core/services/prescription';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.html',
  styleUrls: ['./prescriptions.css'],
  standalone:false
})
export class Prescriptions implements OnInit {

  prescriptions: any[] = [];

  customerId = 1;

  prescriptionData = {
    customerId: 1,
    doctorName: '',
    imageUrl: ''
  };

  constructor(
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  uploadPrescription() {

    this.prescriptionService
      .uploadPrescription(this.prescriptionData)
      .subscribe({
        next: () => {
          alert('Prescription Uploaded');
          this.loadPrescriptions();
        }
      });
  }

  loadPrescriptions() {

    this.prescriptionService
      .getCustomerPrescriptions(this.customerId)
      .subscribe({
        next: (data: any) => {
          this.prescriptions = data;
        }
      });
  }
}
