import { Injectable } from '@angular/core';
import { OrderItem } from '@shared/models/order-item.model';
import { Order } from '@shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from 'app/data/constants/routes/api.routes';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order = new Order();
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    const body = {
        ...this.formData,
        order_items: this.orderItems
    };
    console.log(body);
    return this.http.post(API_ROUTES.ORDER.LISTA, body);
  }

  getOrderList() {
    return this.http.get(API_ROUTES.ORDER.TABLE).toPromise();
  }

  getOrderById(id: number) {
    return this.http.get(API_ROUTES.ORDER.LISTA + '/' + id).toPromise();
  }


}
