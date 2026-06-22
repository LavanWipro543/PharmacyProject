import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.html',
  styleUrls: ['./low-stock.css'],
  standalone:false
})
export class LowStock implements OnInit {

  lowStockItems: any[] = [];

  constructor(
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadLowStock();
  }

  loadLowStock(): void {

    this.inventoryService
      .getAllInventory()
      .subscribe({

        next: (data: any) => {

          this.lowStockItems = data.filter(
            (item: any) =>
              item.availableQuantity <= item.reorderLevel
          );

        }

      });
  }
}

