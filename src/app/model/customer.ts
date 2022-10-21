import {AppUser} from './app-user';

export interface Customer {
    id?: number;
    customerName?: string;
    phoneNumber?: string;
    email?: string;
    note?: string;
    city?: string;
    district?: string;
    images?: string;
    dateOfBirth?: Date;
    address?: string;
    appUser?: AppUser;
}
