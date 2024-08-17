import prisma from "@/libs/prisma";
import { Customers } from "@prisma/client";

export const getAlls = async () => {
  try {
    const customers = await prisma.customers.findMany();

    return customers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        id: id,
      },
    });

    return customer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveCustomer = async (
  customer: Omit<Customers, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const newCustomer = await prisma.customers.create({
      data: {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
    });

    return newCustomer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
