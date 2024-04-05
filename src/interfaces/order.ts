
export interface Order {
    id: string;
    date: string;
    time: string;
    pesosAmount: number | null;
    type: 'Compra' | 'Venta';
    price: number | null ;
    usdAmount: number | null;
    customerId?: string;
    customerName?: string;
}