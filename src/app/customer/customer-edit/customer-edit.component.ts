import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../../model/book';
import {Category} from '../../model/category';
import {Promotion} from '../../model/promotion';
import {BookService} from '../../service/book.service';
import {CategoryService} from '../../service/category.service';
import {PromotionService} from '../../service/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Cart} from '../../model/cart';
import {Customer} from '../../model/customer';
import {TokenStorageService} from '../../service/token-storage.service';
import {CartService} from '../../service/cart.service';
import {CheckoutService} from '../../service/checkout.service';
import {AppUserService} from '../../service/app-user.service';
import {CustomerService} from '../../service/customer.service';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
    username: string;
    customer: Customer;
    customerForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        customerName: new FormControl(''),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        note: new FormControl(''),
        city: new FormControl(''),
        district: new FormControl(''),
        address: new FormControl(''),
        images: new FormControl(''),
        dateOfBirth: new FormControl(''),
    });

    constructor(private tokenStorageService: TokenStorageService,
                private toastr: ToastrService,
                private appUserService: AppUserService,
                private customerService: CustomerService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.username = this.tokenStorageService.getUser().username;
        this.appUserService.getAppUser(this.username).subscribe(value => {
            this.customerService.getCustomer(value?.id).subscribe(item => {
                this.customerForm.patchValue(item);
            });
        });
    }

    editCustomer() {
        this.customer = this.customerForm.value;
        console.log(this.customer);
        this.customerService.edit(this.customer).subscribe(value => {
            this.toastr.success('Cập nhập thông tin thành công', 'Thông Báo');
            this.router.navigateByUrl('/customer');
        });
    }
}
