import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Observable} from 'rxjs';

const API_URL = `${environment.API_URL}`;

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private httpClient: HttpClient) {
    }

    save(customer: Customer): Observable<Customer> {
        return this.httpClient.post<Customer>(API_URL + '/customer/create', customer);
    }

    getCustomer(userId: number): Observable<Customer> {
        return this.httpClient.get<Customer>(API_URL + '/customer/' + userId);
    }

    edit(customer: Customer): Observable<Customer> {
        return this.httpClient.put<Customer>(API_URL + `/customer/update`, customer);
    }
}
