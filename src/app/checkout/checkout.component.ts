import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../model/customer';
import {Card} from '../model/card';
import {CheckoutService} from '../service/checkout.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../service/token-storage.service';
import {AppUserService} from '../service/app-user.service';
import {CustomerService} from '../service/customer.service';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    username: string;
    cartList: Cart[] = [];
    total = 0;
    customer: Customer;
    card: Card;
    book: Book;
    customerForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        customerName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        email: new FormControl(''),
        note: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        images: new FormControl(''),
        dateOfBirth: new FormControl(''),
    });
    cardForm: FormGroup = new FormGroup({
        cardName: new FormControl('', Validators.required),
        creditNumber: new FormControl('', Validators.required),
        expirationDate: new FormControl('01', Validators.required),
        expirationMonth: new FormControl(16, Validators.required),
        codeCvv: new FormControl('', Validators.required),
        customer: new FormControl('')
    });

    constructor(private tokenStorageService: TokenStorageService,
                private cartService: CartService,
                private checkoutService: CheckoutService,
                private toastr: ToastrService,
                private appUserService: AppUserService,
                private customerService: CustomerService) {
        render(
            {
                id: '#myPaypalButtons',
                currency: 'USD',
                value: '5000000.00',
                onApprove: (details => {
                    alert('Thanh toán thành công');
                })
            }
        );
    }

    ngOnInit(): void {
        this.getAllCart();
        this.username = this.tokenStorageService.getUser().username;
        this.appUserService.getAppUser(this.username).subscribe(value => {
            this.customerService.getCustomer(value?.id).subscribe(item => {
                this.customerForm.patchValue({id: item?.id});
                this.customerForm.patchValue(item);
                this.cardForm.patchValue({customer: item});
            });
        });
    }

    getAllCart() {
        if (this.cartService.getCart()) {
            this.cartList = this.cartService.getCart();
            this.total = 0;
            for (const item of this.cartList) {
                this.total = this.total + (item.book.price * item.quantity);
            }
        } else {
            this.cartList = null;
        }
    }

    removeItem(book: Book) {
        this.cartService.removeItemFromCart(book);
        this.getAllCart();
    }

    reduceItem(decrease: Cart) {
        decrease.quantity = -1;
        this.cartService.saveBook(decrease);
        this.getAllCart();
    }

    increaseItem(increase: Cart) {
        increase.quantity = 1;
        this.cartService.saveBook(increase);
        this.getAllCart();
    }

    addCustomer() {
        this.customer = this.customerForm.value;
    }

    addCard() {
        this.card = this.cardForm.value;
        for (const item of this.cartList) {
            item.customer = this.customer;
        }
        this.checkoutService.updateCustomer(this.customer).subscribe(value => {
            this.checkoutService.saveCard(this.card).subscribe(data => {
                this.checkoutService.saveBooksSold(this.cartList).subscribe(db => {
                    this.total = 0;
                    this.toastr.success('Đang chuyển hàng', 'Thông Báo');
                    for (const cart of this.cartList) {
                        this.cartService.removeItemFromCart(cart.book);
                    }
                });
            });
        });
    }
}
