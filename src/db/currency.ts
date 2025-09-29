import prisma from "@/libs/prisma";
import { Currency } from "@prisma/client";

const getCurrencies = async () => {
  try {
    const currencies = await prisma.currency.findMany();

    return currencies;
  } catch (error) {
    throw error;
  }
};

const getCurrency = async (id: string) => {
  try {
    const currency = await prisma.currency.findUnique({
      where: {
        id,
      },
    });

    return currency;
  } catch (error) {
    throw error;
  }
};

const createCurrency = async (
  currency: Omit<Currency, "idAuto" | "createdAt" | "updatedAt">
) => {
  try {
    const newCurrency = await prisma.currency.create({
      data: {
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        companyId: currency.companyId,
        flag: currency.flag,
      },
    });

    return newCurrency;
  } catch (error) {
    throw error;
  }
};

const updateCurrency = async (
  currency: Omit<Currency, "idAuto" | "companyId" | "createdAt" | "updatedAt">
) => {
  try {
    const updatedCurrency = await prisma.currency.update({
      where: {
        id: currency.id,
      },
      data: {
        name: currency.name,
        symbol: currency.symbol,
        flag: currency.flag,
        updatedAt: new Date(),
      },
    });

    return updatedCurrency;
  } catch (error) {
    throw error;
  }
};

const deleteCurrency = async (idAuto: number) => {
  try {
    const deletedCurrency = await prisma.currency.delete({
      where: {
        idAuto,
      },
    });

    return deletedCurrency;
  } catch (error) {
    throw error;
  }
};
const currency = {
  getCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};

export default currency;
