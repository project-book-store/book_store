import {Customer} from './customer';

export interface AppUser {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    creationDate?: string;
    isDeleted?: boolean;
    customer?: Customer;
}
