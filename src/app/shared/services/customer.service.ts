import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/data/constants/routes/api.routes';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomerList() {
    return this.http.get(API_ROUTES.CLIENTES.LISTA).toPromise();
  }
}
