import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Cart} from '../model/cart';
import {BookService} from '../service/book.service';
import {CartService} from '../service/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {AppUserService} from '../service/app-user.service';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  username: string;
  bookList: Book[] = [];
  pageSize = 9;
  checkNext: boolean;
  checkPreview: boolean;
  number: number;
  totalElements: number;
  numberOfElementFirst: number;
  numberOfElementFinal: number;
  total = 0;
  customerId: number;

  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private appUserService: AppUserService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser()?.username;
    this.appUserService.getAppUser(this.username).subscribe(value => {
      this.customerService.getCustomer(value?.id).subscribe(item => {
        this.customerId = item?.id;
        this.getAll(0);
      });
    });
  }

  getAll(page: number) {
    this.bookService.getHistoryBook(page, this.pageSize, this.customerId).subscribe((data?: any) => {
      this.bookList = data?.content;
      this.number = data?.number;
      this.checkNext = !data?.last;
      this.checkPreview = !data?.first;
      this.totalElements = data?.totalElements;
      this.numberOfElementFinal = 1 + data?.size * data?.number;
      this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
    });
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number);
  }

  goNext() {
    this.number++;
    this.getAll(this.number);
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '9':
        this.pageSize = 9;
        this.ngOnInit();
        break;
      case '18':
        this.pageSize = 18;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.ngOnInit();
        break;
    }
  }
}
