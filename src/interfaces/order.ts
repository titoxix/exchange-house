export type OrderType = "BUY" | "SELL";
export interface Order {
  id?: string;
  date?: string;
  time?: string;
  pesosAmount: number | null;
  type: OrderType;
  price: number;
  usdAmount: number | null;
  customerId?: string;
  customerName?: string;
  balanceId: string;
  userId?: string;
  userName?: string;
}
