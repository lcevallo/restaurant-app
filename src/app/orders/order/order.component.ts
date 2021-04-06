import { Component, OnInit } from '@angular/core';
import {OrderService} from '@shared/services/order.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OrderItemsComponent} from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public id: number;


  constructor(
    public service: OrderService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){

    if (form = null) {
      form.resetForm();
    }

    this.service.formData = {
      OrderId : null,
      OrderNo : Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId : 0,
      PMethod : '',
      GTotal : 0
    };

    this.service.orderItems = [];


  }


  AddOrEditOrderItem(orderItemIndex, OrderID): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, OrderID};
    this.dialog.open(OrderItemsComponent, dialogConfig);

  }



}
