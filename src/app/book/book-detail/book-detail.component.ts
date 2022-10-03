import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Cart} from '../../model/cart';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: number;
  cart: Cart;
  cartList: Cart[] = [];
  total = 0;
  bookNumber = 1;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      this.id = +value.get('id');
    });
    this.getBook(this.id);
  }

  getBook(id: number) {
    this.bookService.findById(id).subscribe(data => {
      this.book = data;
    });
  }

  addBook(id: number, quantityBook: number) {
    this.bookService.findById(id).subscribe((data: any) => {
      this.cart = {
        book: data,
        quantity: quantityBook
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
