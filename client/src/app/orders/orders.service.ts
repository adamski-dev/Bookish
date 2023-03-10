import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser(){
    return this.http.get<IOrder[]>(this.baseUrl + 'order');
  }

  getOrderDetails(id: number){
    return this.http.get<IOrder>(this.baseUrl + 'order/' + id);
  }
}
