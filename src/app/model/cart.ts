import {Book} from './book';
import {Customer} from './customer';

export interface Cart {
    book?: Book;
    quantity?: number;
    customer?: Customer;
    quantityBook?: number;
}
