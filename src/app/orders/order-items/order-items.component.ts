import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderItem} from '@shared/models/order-item.model';
import { ItemService } from '@shared/services/item.service';
import {Item} from '@shared/models/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from '@shared/services/order.service';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {

    this.itemService.getItemList().then(res => this.itemList = res[0] as Item[] );

    // this.data.orderItemIndex Es lo que viene del componente Order cuando abre el modal cuando es nuevo trae null
    if (this.data.orderItemIndex == null) {
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
    else {
      // Aqui saco una copia del elemento seleccionado que esta en orderService
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }

  }

  updatePrice(ctrl): void{
    if (ctrl.selectedIndex == 0){
          this.formData.Price = 0;
          this.formData.ItemName = '';
        }
    else{
      this.formData.Price = this.itemList[ctrl.selectedIndex-1].price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex-1].name;
    }
    this.updateTotal();
  }

  updateTotal(): void {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form): void{

      if (this.validateForm(form.value)){

        // Verifico que sea nuevo si no es nuevo significa que debo de actualizar
        if ( this.data.orderItemIndex == null ) {
          this.orderService.orderItems.push(form.value);
        }
        else {
          // Aqui actualizo ese arreglo
          this.orderService.orderItems[this.data.orderItemIndex] = form.value;
        }
        this.dialogRef.close();
      }
  }

  validateForm(formData: OrderItem): boolean{
    this.isValid = true;
    if (formData.ItemId == 0) {
      this.isValid = false;
    }
    else if (formData.Quantity == 0){
      this.isValid = false;
    }
    return this.isValid;
  }

}
