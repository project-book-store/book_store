import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../model/promotion';

const API_URL = `${environment.API_URL}`;

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor(private httpClient: HttpClient) {
    }

    getAll(page: number, name: string, pageSize: number): Observable<Promotion[]> {
        return this.httpClient.get<Promotion[]>(API_URL + `/promotion?keySearch=` + name + `&page=` + page + `&size=` + pageSize);
    }

    deletePromotion(id: number): Observable<Promotion> {
        // @ts-ignore
        return this.httpClient.put<Promotion>(API_URL + `/promotion/` + id);
    }

    savePromotion(promotion: Promotion): Observable<Promotion> {
        return this.httpClient.post<Promotion>(API_URL + `/promotion/create`, promotion);
    }

    findByPromotion(id: number): Observable<Promotion> {
        return this.httpClient.get<Promotion>(API_URL + `/promotion/${id}`);
    }

    editPromotion(promotion: Promotion): Observable<Promotion> {
        return this.httpClient.put<Promotion>(API_URL + `/promotion/edit`, promotion);
    }

    getAllPromotion(): Observable<Promotion[]> {
        return this.httpClient.get<Promotion[]>(API_URL + `/promotion/list`);
    }
}
