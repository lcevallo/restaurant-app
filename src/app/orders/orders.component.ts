import { Component, OnInit } from '@angular/core';
import {OrderService} from '@shared/services/order.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(private orderService: OrderService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
   this.refreshList();
  }

  refreshList(){
    this.orderService.getOrderList().then(res => this.orderList = res['orders_list']);
  }

  openForEdit(order_id: number): void {
    this.router.navigate(['/order/edit/' + order_id]);
  }

  onOrderDelete(order_id: number): void {
    if (confirm('Are you sure to delete this record?')){
      this.refreshList();
      this.toastr.warning('Deleted Successfully', 'Restaurant APP');
    }
  }
}
