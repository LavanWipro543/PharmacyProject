import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css'],
  standalone:false
})
export class Inventory implements OnInit {

  inventoryList: any[] = [];

  inventoryData = {
    medicineId: 0,
    availableQuantity: 0,
    reorderLevel: 0
  };

  constructor(
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {

    this.inventoryService
      .getAllInventory()
      .subscribe({

        next: (data: any) => {
          this.inventoryList = data;
        }

      });
  }

  addInventory(): void {

    this.inventoryService
      .addInventory(this.inventoryData)
      .subscribe({

        next: () => {

          alert('Inventory Added');

          this.loadInventory();

          this.inventoryData = {
            medicineId: 0,
            availableQuantity: 0,
            reorderLevel: 0
          };
        }
      });
  }
}