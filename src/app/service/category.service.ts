import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';
import {A} from '@angular/cdk/keycodes';

const API_URL = `${environment.API_URL}`;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(API_URL + `/category`);
    }
}
