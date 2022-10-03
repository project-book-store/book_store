import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/book';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/cart';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    bookList: Book[] = [];
    pageSize = 9;
    checkNext: boolean;
    checkPreview: boolean;
    number: number;
    totalElements: number;
    numberOfElementFirst: number;
    numberOfElementFinal: number;
    cart: Cart;
    cartList: Cart[] = [];
    total = 0;
    id: number;

    constructor(private bookService: BookService,
                private cartService: CartService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(value => {
            this.id = +value.get('id');
            this.getAll(0);
        });
    }

    getAll(page: number) {
        this.bookService.getAll(page, this.pageSize, this.id).subscribe((data?: any) => {
            this.bookList = data?.content;
            this.number = data?.number;
            this.checkNext = !data.last;
            this.checkPreview = !data.first;
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

    addBook(id: number) {
        this.bookService.findById(id).subscribe((data: any) => {
            this.cart = {
                book: data,
                quantity: 1
            };
            this.cartService.saveBook(this.cart);
            this.getAllCart();
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
}
