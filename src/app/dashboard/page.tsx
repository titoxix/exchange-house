import OrdersTable from "@/components/OrdersTable";
import PriceCard from "@/components/PriceCard";
import { Divider } from "@nextui-org/react";
import { getOrdersByBalanceAndDate } from "@/server/orders";
import { getCustomers } from "@/server/customers";
import { Order } from "@/interfaces/order";
import OrderForm from "@/components/OrderForm";
import { Customer } from "@/interfaces/customer";
import { getBalanceOpenedByDateByUser } from "@/server/balance";
import { getCurrentDate, getCurrentDateMontName } from "@/utils/dates";
import { Balance } from "@/interfaces/balance";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

async function getInitData(): Promise<{
  orders: Order[];
  customers: Omit<Customer, "companyId">[];
  balance: Balance | null;
}> {
  const session = await auth();

  if (!session?.user) redirect("/signin");

  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");

    const { status: statusCustomers, data: customers } = await getCustomers(
      session?.user.companyId
    );

    const balanceDayResult = await getBalanceOpenedByDateByUser(
      session.user.id,
      currentDate
    );

    if (!balanceDayResult) {
      return {
        orders: [],
        customers: statusCustomers === 200 ? customers : [],
        balance: null,
      };
    }

    const { status: statusOrders, data: orders } =
      await getOrdersByBalanceAndDate(balanceDayResult.id, currentDate);

    return {
      orders: statusOrders === 200 ? orders : [],
      customers: statusCustomers === 200 ? customers : [],
      balance: balanceDayResult,
    };
  } catch (error) {
    return {
      orders: [],
      customers: [],
      balance: null,
    };
  }
}

export default async function Home() {
  const { orders, customers, balance } = await getInitData();
  const currentDate = getCurrentDateMontName();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Cotizaciones</span>
        <div className="flex flex-col gap-3 items-center justify-center">
          <PriceCard
            currency="Dólar"
            flag="united-states.png"
            buy="40,4500"
            sell="42,8500"
          />
          {/*  <PriceCard
            currency="Dólar eBROU"
            flag="united-states.png"
            buy="37,2000"
            sell="38,6000"
          />
          <PriceCard
            currency="Euro"
            flag="european-union.png"
            buy="38,47000"
            sell="43,21000"
          /> */}
          {/*  <PriceCard
            currency="Peso Argentino"
            flag="argentina.png"
            buy="0,02400"
            sell="0,20000"
          />
          <PriceCard
            currency="Real"
            flag="brazil.png"
            buy="7,40000"
            sell="9,10000"
          /> */}
        </div>
        <span className="text-xs text-default-400">
          Última actualización: 01/04/2024 17:10:02
        </span>
      </section>
      <Divider className="my-4" />
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">{`Operaciones del día: ${currentDate}`}</span>
        <OrderForm
          customers={customers}
          originalPrice={39.8}
          isBalanceOpened={!!balance}
          balance={balance}
        />
        <OrdersTable orders={orders} />
      </section>
    </div>
  );
}
