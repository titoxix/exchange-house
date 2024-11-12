import { AccountStatus } from "@prisma/client";

export interface Account {
  id: string;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  accountsQuantity: Account[];
}
