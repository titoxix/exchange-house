import OrdersTable from "@/components/OrdersTable";
import PriceCard from "@/components/PriceCard";
import { Divider } from "@nextui-org/react";
import { getAllOrders } from "@/server/orders";
import { getCustomers } from "@/server/customers";
import { Order } from "@/interfaces/order";
import OrderForm from "@/components/OrderForm";
import { Customer } from "@/interfaces/customer";

async function getInitData(): Promise<{
  orders: Order[];
  customers: Customer[];
}> {
  const { status: statusOrders, data: orders } = await getAllOrders();
  const { status: statusCustomers, data: customers } = await getCustomers();

  return {
    orders: statusOrders === 200 ? orders : [],
    customers: statusCustomers === 200 ? customers : [],
  };
}

export default async function Home() {
  const { orders, customers } = await getInitData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Cotizaciones</span>
        <div className="flex gap-3 justify-center">
          <PriceCard
            currency="Dólar"
            flag="united-states.png"
            buy="36,70000"
            sell="39,10000"
          />
          <PriceCard
            currency="Dólar eBROU"
            flag="united-states.png"
            buy="37,20000"
            sell="38,60000"
          />
          <PriceCard
            currency="Euro"
            flag="european-union.png"
            buy="38,47000"
            sell="43,21000"
          />
          <PriceCard
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
          />
        </div>
        <span className="text-xs text-default-400">
          Última actualización: 01/04/2024 17:10:02
        </span>
      </section>
      <Divider className="my-4" />
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Últimas operaciones</span>
        <OrderForm customers={customers} originalPrice={39.8} />
        <OrdersTable orders={orders} />
      </section>
    </div>
  );
}
