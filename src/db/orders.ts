import prisma from "@/libs/prisma";
import { Order } from "@prisma/client";

const getOrders = async (withCustomer: boolean = false) => {
  try {
    const orders = await prisma.order.findMany({
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
    const orders = await prisma.order.findMany({
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
  order: Omit<Order, "idAuto" | "updatedAt" | "createdAt">
): Promise<Order> => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        id: order.id,
        type: order.type,
        usdAmount: order.usdAmount,
        price: order.price,
        pesoAmount: order.pesoAmount,
        customerId: order.customerId,
        balanceId: order.balanceId,
        companyId: order.companyId,
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
