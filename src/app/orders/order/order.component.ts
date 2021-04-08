import { Component, OnInit } from '@angular/core';
import {OrderService} from '@shared/services/order.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OrderItemsComponent} from '../order-items/order-items.component';
import { CustomerService } from '@shared/services/customer.service';
import { Customer } from '@shared/models/customer.model';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {IOrders} from '@shared/interfaces/i-orders';
import {OrderItem} from '@shared/models/order-item.model';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public id: number;
  customerList: Customer[];
  isValid = true;
  ordersRes: IOrders;

  constructor(
    public service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private toaster: ToastrService,
    private router: Router,
    private  currentRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const orderID = this.currentRoute.snapshot.paramMap.get('id');

    // Insert Operation
    if (orderID == null) {
      this.resetForm();
    }
    else{
        this.service.getOrderById(+orderID).then(res => {
          this.ordersRes = res as IOrders;
          this.service.formData = this.ordersRes;
          const orderItemsArray = this.ordersRes.order_items.map( obj => obj.items);
          this.service.orderItems = [];
          for (let j = 0 ; j < this.ordersRes.order_items.length; j++ ){
                    this.service.orderItems.push({
                      order_item_id: this.ordersRes.order_items[j].order_item_id,
                      ItemName: '',
                      Total: 0,
                      item_id: this.ordersRes.order_items[j].item_id,
                      order_id: +orderID,
                      price: 0,
                      quantity: this.ordersRes.order_items[j].quantity
                    });
          }
          for (let i = 0 ; i < orderItemsArray.length; i++) {
            this.service.orderItems[i].ItemName = orderItemsArray[i].name;
            this.service.orderItems[i].price = orderItemsArray[i].price;
            this.service.orderItems[i].Total = parseFloat((this.service.orderItems[i].quantity * orderItemsArray[i].price).toFixed(2));
          }
          // this.service.convert(this.ordersRes.order_items);
        });

    }
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
      g_total : 0,
      deletedOrderItemsIDs:''
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
    
    // OrderItemId se necesitara cuando se requiera actualizar toda la orden
    if(OrderItemId!=null){
      this.service.formData.deletedOrderItemsIDs += OrderItemId + ",";
    }
    
    this.service.orderItems.splice(i, 1);
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
                    this.toaster.success('Guardado exitoso!', 'Restaurant-APP');
                    this.router.navigate(['/orders']);
               }
          );
      }
  }

}
