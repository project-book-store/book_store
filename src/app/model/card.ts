import {Customer} from './customer';

export interface Card {
    id?: number;
    cardName?: string;
    creditNumber?: string;
    expirationDate?: number;
    expirationMonth?: number;
    codeCvv?: string;
    customer?: Customer;
}
