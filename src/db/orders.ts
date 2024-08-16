import prisma from "@/libs/prisma";
import { Orders } from "@prisma/client";

export const getOrders = async () => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        customer: true,
      },
    });

    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveOrder = async (
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
      },
    });

    return newOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
