import { Order as OrderDB } from "@prisma/client";
import { Customer as CustomerDB } from "@prisma/client";
import { Balance as BalanceDB } from "@prisma/client";
import { User as UserDB } from "@prisma/client";
import { Order } from "@/interfaces/order";

interface Params {
  order: OrderDB;
  customer: CustomerDB;
  balance: BalanceDB;
  user?: UserDB;
}
export const adapterDataToFront = (params: Params): Order => {
  const { order, customer, balance, user } = params;
  return {
    id: order.id,
    date: order.createdAt.toLocaleDateString(),
    time: order.createdAt.toLocaleTimeString(),
    pesosAmount: order.pesoAmount,
    type: order.type,
    price: order.price,
    usdAmount: order.usdAmount,
    customerId: customer.id,
    customerName: `${customer.name} ${customer.lastName}`,
    balanceId: balance.id,
    userId: user?.id,
    userName: `${user?.name} ${user?.lastName}`,
  };
};
