import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../model/promotion';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient: HttpClient) { }

  getAll(page: number, name: string, pageSize: number): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(API_URL + `/promotion?keySearch=` + name + `&page=` + page + `&size=` + pageSize);
  }

  deletePromotion(id: number): Observable<Promotion> {
    return this.httpClient.delete<Promotion>(API_URL + `/promotion/delete` + id);
  }
}
