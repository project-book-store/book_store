import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {Cart} from '../../model/cart';
import {BookService} from '../../service/book.service';
import {CartService} from '../../service/cart.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Promotion} from '../../model/promotion';

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
    bookList: Book[] = [];
    deleteList: Book[] = [];
    keySearch = '';
    searchForm = new FormGroup({
        content: new FormControl('')
    });

    checkNext: boolean;
    checkPreview: boolean;
    number: number;

    totalElements: number;
    pageSize = 9;

    numberOfElementFirst: number;
    numberOfElementFinal: number;
    checkError = true;

    cart: Cart;
    cartList: Cart[] = [];
    total = 0;

    constructor(private bookService: BookService,
                private activatedRoute: ActivatedRoute,
                private cartService: CartService,
                private router: Router) {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.keySearch = paramMap.get('keySearch');
        });
    }

    ngOnInit(): void {
        this.getAll(0);
    }

    getAll(page: number) {
        if (this.keySearch === 'null' || this.keySearch === '#') {
            return this.bookList = [];
        }
        if (this.keySearch === undefined) {
            this.keySearch = '';
        }
        this.bookService.getAllBook(page, this.keySearch, this.pageSize).subscribe((data?: any) => {
            if (data?.content.length < 1 || data?.content.length === undefined) {
                this.bookList = [];
                return;
            }
            this.number = data?.number;
            this.checkNext = !data?.last;
            this.checkPreview = !data?.first;
            this.bookList = data?.content;
            this.totalElements = data?.totalElements;
            this.numberOfElementFinal = 1 + data?.size * data?.number;
            this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
        }, error => {
            console.log(error);
        }, () => {
        });
    }

    search() {
        this.keySearch = this.searchForm.value.content;
        this.ngOnInit();
    }

    goPrevious() {
        this.number--;
        this.getAll(this.number);
    }

    goNext() {
        this.number++;
        this.getAll(this.number);
    }

    checkbox(promotion: Promotion) {
        for (let i = 0; i < this.deleteList.length; i++) {
            if (this.deleteList[i].id === promotion.id) {
                return true;
            }
        }
        return false;
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
                this.total = this.total + ((item.book.price * (100 - item.book.promotion.promotionPrice) / 100) * item.quantity);
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

    addBooks(id: number) {
        this.bookService.findById(id).subscribe((data: any) => {
            this.cart = {
                book: data,
                quantity: 1
            };
            this.cartService.saveBook(this.cart);
            this.getAllCart();
            this.router.navigateByUrl('checkout');
        });
    }
}
