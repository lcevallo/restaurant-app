import { Injectable } from '@angular/core';
import { OrderItem } from '@shared/models/order-item.model';
import { Order } from '@shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from 'app/data/constants/routes/api.routes';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order = new Order();
  orderItems: OrderItem[];

  constructor(private http:HttpClient) { }

  saveOrUpdateOrder(){
    let body = {
        ...this.formData,
        order_items: this.orderItems
    }
    return this.http.post(API_ROUTES.ORDER.LISTA,body);
  }
  
}
