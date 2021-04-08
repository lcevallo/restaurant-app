import { Component, OnInit } from '@angular/core';
import {OrderService} from '@shared/services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrderList().then(res => this.orderList = res['orders_list']);
  }

  openForEdit(order_id: number): void {
    this.router.navigate(['/order/edit/' + order_id]);
  }
}
