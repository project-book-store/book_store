import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../model/cart';
import {Book} from '../model/book';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private httpClient: HttpClient) { }

  getCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(API_URL + `/statistic/customer`);
  }

  getQuantityBook(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(API_URL + `/statistic/quantityBook`);
  }

  getBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/statistic/book`);
  }

  getQuantityBooksSold(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(API_URL + `/statistic/quantityBooksSold`);
  }
}
