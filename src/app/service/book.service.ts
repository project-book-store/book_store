import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/book';
import {Promotion} from '../model/promotion';

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, pageSize: number, id: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/book/${id}?page=` + page + `&size=` + pageSize);
  }

  findById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(API_URL + `/book/detail/${id}`);
  }

  getBestSellingBook(page: number, pageSize: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/bestSellingBook?page=` + page + `&size=` + pageSize);
  }

  getHistoryBook(page: number, pageSize: number, customerId: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/historyBook/${customerId}?page=` + page + `&size=` + pageSize);
  }

  getAllBook(page: number, name: string, pageSize: number): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(API_URL + `/book/list?keySearch=` + name + `&page=` + page + `&size=` + pageSize);
  }

  deleteBook(id: number): Observable<Promotion> {
    // @ts-ignore
    return this.httpClient.put<Promotion>(API_URL + `/book/` + id);
  }

  saveBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(API_URL + `/book/create`, book);
  }

  findByBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(API_URL + `/findByIdBook/${id}`);
  }

  editBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(API_URL + `/book/edit`, book);
  }
}
