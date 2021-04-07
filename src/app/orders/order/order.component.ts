import { Component, OnInit } from '@angular/core';
import {OrderService} from '@shared/services/order.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OrderItemsComponent} from '../order-items/order-items.component';
import { CustomerService } from '@shared/services/customer.service';
import { Customer } from '@shared/models/customer.model';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public id: number;
  customerList: Customer[];
  isValid = true;


  constructor(
    public service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService
    ) { }

  ngOnInit(): void {
    this.resetForm();
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[] );
  }

  resetForm(form?: NgForm): void{

    if (form = null) {
      form.resetForm();
    }

    this.service.formData = {
      order_id : null,
      order_no : Math.floor(100000 + Math.random() * 900000).toString(),
      customer_id : 0,
      p_method : '',
      g_total : 0
    };

    this.service.orderItems = [];


  }


  AddOrEditOrderItem(orderItemIndex: number, order_id): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, order_id};
    /**
     * Despues de cerrar el dialogo que servira para seleccionar el item de comida actualizare el Grand Total
     */
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.updateGrandTotal();
      }
    );

  }


  onDeleteOrderItem(OrderItemId: number, i: number): void {
    this.service.orderItems.splice(i, 1);
    // OrderItemId se necesitara cuando se requiera actualizar toda la orden

    this.updateGrandTotal();
  }

  /**
   * Cuando se agrega o se elimina un item de comida se actualizara el valor del Grand Total
   */
  updateGrandTotal(): void {
    this.service.formData.g_total = this.service.orderItems.reduce((prev, curr) => {
          return prev + curr.Total;
          }, 0);

    this.service.formData.g_total  = parseFloat( this.service.formData.g_total.toFixed(2));
  }

  validateForm(): boolean {
    this.isValid = true;
    if (this.service.formData.customer_id == 0)
      {
        this.isValid = false;
      }
    else if (this.service.orderItems.length == 0)
      {
        this.isValid = false;
      }
    return this.isValid;
  }

  onSubmit(form: NgForm): void {
      if (this.validateForm()) {
          this.service.saveOrUpdateOrder().subscribe(res => {
                    this.resetForm();
               }
          )
      }
  }

}
