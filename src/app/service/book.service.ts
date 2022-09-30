import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/book';

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, pageSize: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/book?page=` + page + `&size=` + pageSize);
  }

  findById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(API_URL + `/book/${id}`);
  }
}
