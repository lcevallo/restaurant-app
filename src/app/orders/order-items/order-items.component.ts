import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderItem} from '@shared/models/order-item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>
  ) { }

  ngOnInit(): void {
    this.formData = {
      OrderItemId: null,
      OrderId: this.data.OrderID,
      ItemId: 0,
      Quantity: 0,
      ItemName: '',
      Price: 0,
      Total: 0
    };

  }

}
