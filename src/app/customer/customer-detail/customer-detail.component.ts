import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {Cart} from '../../model/cart';
import {BookService} from '../../service/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../service/cart.service';
import {Customer} from '../../model/customer';
import {Card} from '../../model/card';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {CheckoutService} from '../../service/checkout.service';
import {ToastrService} from 'ngx-toastr';
import {AppUserService} from '../../service/app-user.service';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  username: string;
  customer: Customer;

  constructor(private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private appUserService: AppUserService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.appUserService.getAppUser(this.username).subscribe(value => {
      this.customerService.getCustomer(value?.id).subscribe(item => {
        this.customer = item;
      });
    });
  }
}
