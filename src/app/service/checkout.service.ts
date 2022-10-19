import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {Customer} from '../model/customer';
import {HttpClient} from '@angular/common/http';
import {Card} from '../model/card';
import {Cart} from '../model/cart';

const API_URL = `${environment.API_URL}`;

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private httpClient: HttpClient) {
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.put<Customer>(API_URL + `/customer/update`, customer);
    }

    saveCard(card: Card): Observable<Card> {
        return this.httpClient.post<Card>(API_URL + `/card/create`, card);
    }

    saveBooksSold(cart: Cart[]): Observable<Cart[]> {
        return this.httpClient.post<Cart[]>(API_URL + `/booksSold/create`, cart);
    }
}
