import { Injectable } from '@angular/core';
import { OrderItem } from '@shared/models/order-item.model';
import { Order } from '@shared/models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order = new Order();
  orderItems: OrderItem[];

  constructor() { }
}
