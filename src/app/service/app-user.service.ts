import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AppUser} from '../model/app-user';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private httpClient: HttpClient) {
  }

  save(appUser: AppUser): Observable<AppUser> {
    return this.httpClient.post<AppUser>(API_URL + '/app-user/create', appUser);
  }

  getAppUser(username: string): Observable<AppUser> {
    return this.httpClient.get<AppUser>(API_URL + '/app-user/' + username);
  }
}
