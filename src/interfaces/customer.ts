import { Order } from './order';

export interface Customer {
    id: string;
    name: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    address:string | null;
    orders?: Order[];
    createdAt?: string;
    updatedAt?: string;
}