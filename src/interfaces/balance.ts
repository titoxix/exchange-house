export interface Balance {
  id: string;
  usdInitialAmount: number;
  pesosInitialAmount: number;
  usdAmount: number;
  pesosAmount: number;
  state: "OPEN" | "CLOSED";
  createdAt: string;
}
