import { Injectable } from '@angular/core';
import { OrderItem } from '@shared/models/order-item.model';
import { Order } from '@shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from 'app/data/constants/routes/api.routes';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import {IOrderItems} from '@shared/interfaces/i-order-item';
import {IOrders} from '@shared/interfaces/i-orders';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: IOrders = new Order();
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    const body = {
        ...this.formData,
        order_items: this.orderItems
    };
    return this.http.post(API_ROUTES.ORDER.LISTA, body);
  }

  getOrderList() {
    return this.http.get(API_ROUTES.ORDER.TABLE).toPromise();
  }

  getOrderById(id: number) {
    return this.http.get(API_ROUTES.ORDER.LISTA + '/' + id).toPromise();
  }

  convert( iOrderItems: IOrderItems[])
  {
    let iOrderItemsCopy = [...iOrderItems];
    let itemsArray = iOrderItemsCopy.map( obj => obj.items);
    console.log(itemsArray.length);
    for (let i = 0 ; i < itemsArray.length; i++) {
      this.orderItems[i].ItemName = itemsArray[i].name;
      this.orderItems[i].price = itemsArray[i].price;
      this.orderItems[i].Total = parseFloat((this.orderItems[i].quantity * itemsArray[i].price).toFixed(2));
    }
  }
}
