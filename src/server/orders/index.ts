import OrdersDB from "@/db/orders";
import { foundsAvailable } from "@/server/balance";
import { Order } from "@/interfaces/order";
import { v4 as uuidv4 } from "uuid";
import { updateBalance } from "../balance";

interface Response {
  error?: string;
  message?: string;
  status: number;
  data: Order[] | [];
}

export const getAllOrders = async (): Promise<Response> => {
  try {
    const orders = await OrdersDB.getOrders(true);

    if (!orders) {
      return { message: "No se encontrarón resultados", status: 404, data: [] };
    }

    const adaptedOrders: Order[] = orders.map((order) => {
      return {
        id: order.id,
        date: order.createdAt.toLocaleDateString(),
        time: order.createdAt.toLocaleTimeString(),
        pesosAmount: order.pesoAmount,
        type: order.type,
        price: order.price,
        usdAmount: order.usdAmount,
        customerId: order.customer.id,
        customerName: order.customer.name,
        balanceId: order.balance.id,
      };
    });

    return { message: "OK", status: 200, data: adaptedOrders };
  } catch (error) {
    console.error(error);
    return { error: "Error to get data from DB", status: 500, data: [] };
  }
};

export const getOrdersByDate = async (date: string): Promise<Response> => {
  try {
    const orders = await OrdersDB.getOrdersByDate(date, true);

    if (!orders) {
      return { message: "No se encontrarón resultados", status: 404, data: [] };
    }

    const adaptedOrders: Order[] = orders.map((order) => {
      return {
        id: order.id,
        date: order.createdAt.toLocaleDateString(),
        time: order.createdAt.toLocaleTimeString(),
        pesosAmount: order.pesoAmount,
        type: order.type,
        price: order.price,
        usdAmount: order.usdAmount,
        customerId: order.customer.id,
        customerName: `${order.customer.name} ${order.customer.lastName}`,
        balanceId: order.balance.id,
      };
    });

    return { message: "OK", status: 200, data: adaptedOrders };
  } catch (error) {
    console.error(error);
    return { error: "Ocurrio un error inesperado", status: 500, data: [] };
  }
};

export const createOrder = async ({
  customer,
  type,
  received,
  delivered,
  price,
  balance,
}: any) => {
  try {
    const generatedId = uuidv4();

    const isFoundAvailable = await foundsAvailable(balance.id, delivered, type);

    if (!isFoundAvailable) {
      throw new Error("Insufficient funds");
    }

    const newOrderResult = await OrdersDB.saveOrder({
      id: generatedId,
      type,
      pesoAmount: type === "BUY" ? parseFloat(delivered) : parseFloat(received),
      usdAmount: type === "BUY" ? parseFloat(received) : parseFloat(delivered),
      price: parseFloat(price),
      customerId: Number(customer.idAuto),
      balanceId: Number(balance?.idAuto),
    });

    if (!newOrderResult) {
      throw new Error("An error occurred while trying to create a new order");
    }

    if (newOrderResult?.idAuto && balance?.idAuto) {
      const usdAmount =
        newOrderResult.type === "BUY"
          ? balance.usdAmount + newOrderResult.usdAmount
          : balance.usdAmount - newOrderResult.usdAmount;

      const pesosAmount =
        newOrderResult.type === "BUY"
          ? balance.pesosAmount - newOrderResult.pesoAmount
          : balance.pesosAmount + newOrderResult.pesoAmount;

      await updateBalance({
        ...balance,
        usdAmount,
        pesosAmount,
      });
    }

    return newOrderResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
