import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../core/services/medicine';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.html',
  styleUrls: ['./medicines.css'],
  standalone:false
})
export class Medicines implements OnInit {

  medicines: any[] = [];

  medicineData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    prescriptionRequired: false
  };

  constructor(
    private medicineService: Medicine
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {

    this.medicineService
      .getAllMedicines()
      .subscribe({

        next: (data: any[]) => {
          this.medicines = data;
        }

      });
  }

  addMedicine(): void {

    this.medicineService
      .addMedicine(this.medicineData)
      .subscribe({

        next: () => {

          alert('Medicine Added');

          this.loadMedicines();

          this.resetForm();
        }

      });
  }

  deleteMedicine(id: number): void {

    if(confirm('Delete Medicine?')) {

      this.medicineService
        .deleteMedicine(id)
        .subscribe({

          next: () => {

            alert('Medicine Deleted');

            this.loadMedicines();
          }

        });

    }
  }

  resetForm(): void {

    this.medicineData = {
      name: '',
      description: '',
      price: 0,
      category: '',
      prescriptionRequired: false
    };

  }
}