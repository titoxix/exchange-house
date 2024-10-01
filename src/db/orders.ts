import prisma from "@/libs/prisma";
import { Order } from "@prisma/client";

const getOrders = async (
  companyIdAuto: number,
  withCustomer: boolean = false
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        companyId: companyIdAuto,
      },
      include: {
        customer: withCustomer,
        balance: true,
        user: true,
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

const getOrdersByUser = async (userIdAuto: number) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userIdAuto,
      },
      include: {
        customer: true,
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

const getOrdersByBalanceAndDate = async (
  balanceIdAuto: number,
  date: string,
  withCustomer: boolean = false
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        balanceId: balanceIdAuto,
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
        userId: order.userId,
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
  getOrdersByBalanceAndDate,
  getOrdersByUser,
};

export default orders;
