import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/data/constants/routes/api.routes';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  getItemList(){
    return this.http.get(API_ROUTES.ITEMS.LISTA).toPromise();
  }
}
