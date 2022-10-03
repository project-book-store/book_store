import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Book} from '../model/book';

const CART_KEY = 'cartId';
const QUANTITY_KEY = 'quantity';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartList: Cart[] = [];
    book: Book;

    constructor() {
    }

    public saveBook(cartId) {
        if (localStorage.getItem('cartId')) {
            this.cartList = JSON.parse(localStorage.getItem('cartId'));
        }
        let exists = false;

        this.cartList.forEach(item => {
            if (item.book.id === cartId.book.id) {
                exists = true;
                if (cartId.quantity < 1 && item.quantity === 1) {
                    item.quantity = 1;
                } else {
                    item.quantity += cartId.quantity;
                }
            }
        });

        if (!exists && cartId.quantity > 0) {
            const cartDto = {} as Cart;
            cartDto.quantity = cartId.quantity;
            cartDto.book = cartId.book;
            this.cartList.push(cartDto);
        }
        window.localStorage.setItem(CART_KEY, JSON.stringify(this.cartList));
    }

    public getCart() {
        return JSON.parse(window.localStorage.getItem(CART_KEY));
    }

    public removeItemFromCart(book: Book) {
        if (localStorage.getItem('cartId')) {
            this.cartList = JSON.parse(localStorage.getItem('cartId'));
        }
        this.cartList = this.cartList.filter(item => item.book.id !== book.id);
        localStorage.setItem('cartId', JSON.stringify(this.cartList));
    }
}
