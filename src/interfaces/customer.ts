import { Order } from "./order";

export interface Customer {
  idAuto?: number;
  id: string;
  name: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  companyId?: string;
  orders?: Order[];
  createdAt?: string;
  updatedAt?: string;
}
