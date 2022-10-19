import {AppUser} from './app-user';

export interface Customer {
    id?: number;
    customerName?: string;
    phoneNumber?: string;
    email?: string;
    note?: string;
    city?: string;
    district?: string;
    address?: string;
    appUser?: AppUser;
}
