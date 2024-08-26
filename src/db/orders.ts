import prisma from "@/libs/prisma";
import { Orders } from "@prisma/client";

const getOrders = async (withCustomer: boolean = false) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        customer: withCustomer,
        balance: true,
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrdersByDate = async (date: string, withCustomer: boolean = false) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        createdAt: {
          gte: new Date(date), // date in format yyyy-mm-dd
        },
      },
      include: {
        customer: withCustomer,
        balance: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const saveOrder = async (
  order: Omit<Orders, "idAuto" | "updatedAt" | "createdAt">
): Promise<Orders> => {
  try {
    const newOrder = await prisma.orders.create({
      data: {
        id: order.id,
        type: order.type,
        usdAmount: order.usdAmount,
        price: order.price,
        pesoAmount: order.pesoAmount,
        customerId: order.customerId,
        balanceId: order.balanceId,
      },
    });

    return newOrder;
  } catch (error) {
    throw error;
  }
};

const orders = {
  getOrders,
  saveOrder,
  getOrdersByDate,
};

export default orders;
