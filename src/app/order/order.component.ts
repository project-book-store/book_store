import { Component, OnInit } from '@angular/core';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {Book} from '../model/book';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cartList: Cart[] = [];
  total = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getAllCart();
  }

  reload() {
    this.ngOnInit();
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
