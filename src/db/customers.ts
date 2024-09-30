import prisma from "@/libs/prisma";
import { Customer } from "@prisma/client";

export const getAllsByCompanyId = async (companyIdAuto: number) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        companyId: companyIdAuto,
      },
    });

    return customers;
  } catch (error) {
    throw error;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    return customer;
  } catch (error) {
    throw error;
  }
};

export const saveCustomer = async (
  customer: Omit<Customer, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        companyId: customer.companyId,
      },
    });

    return newCustomer;
  } catch (error) {
    throw error;
  }
};
