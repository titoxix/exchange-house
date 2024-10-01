import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { getAllOrdersByUserId, getAllOrdersByCompanyId } from "@/server/orders";
import OrdersTable from "@/components/OrdersTable";
import { Order } from "@/interfaces/order";

async function getInitialData(): Promise<{
  orders: Order[];
  isUserAdmin: boolean;
}> {
  const session = await auth();
  if (!session?.user) redirect("/login");

  try {
    if (session.user.role === "ADMIN" || session.user.role === "SUBSCRIBER") {
      const { status: statusOrders, data: orders } =
        await getAllOrdersByCompanyId(session.user.companyId);
      return { orders: statusOrders === 200 ? orders : [], isUserAdmin: true };
    }

    const { status: statusOrders, data: orders } = await getAllOrdersByUserId(
      session.user.id
    );
    return { orders: statusOrders === 200 ? orders : [], isUserAdmin: false };
  } catch (error) {
    console.error(error);
    return {
      orders: [],
      isUserAdmin: false,
    };
  }
}

export default async function Orders() {
  const { orders, isUserAdmin } = await getInitialData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Operaciones</span>
        <OrdersTable orders={orders} showColumnUser={isUserAdmin} />
      </section>
    </div>
  );
}
