import prisma from "@/libs/prisma";
import { Balance } from "@prisma/client";
import { getCurrentDate } from "@/utils/dates";

const getAllsBalances = async () => {
  try {
    const balancesInformation = await prisma.balance.findMany();

    return balancesInformation;
  } catch (error) {
    throw error;
  }
};

const getBalanceById = async (id: string) => {
  try {
    const balanceInformation = await prisma.balance.findFirst({
      where: {
        id,
      },
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const getBalancePendingClose = async (userIdAuto: number, date: string) => {
  try {
    const balanceInformation = await prisma.balance.findFirst({
      where: {
        userId: userIdAuto,
        createdAt: {
          lte: new Date(date), // date in format yyyy-mm-dd
        },
        state: "OPEN",
      },
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const getBalanceOpenedByDate = async (userIdAuto: number, date: string) => {
  try {
    const balanceInformation = await prisma.balance.findFirst({
      where: {
        userId: userIdAuto,
        createdAt: {
          gte: new Date(date), // date in format yyyy-mm-dd
        },
        state: "OPEN",
      },
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const saveNewBalance = async (
  balance: Omit<Balance, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const balanceInformation = await prisma.balance.create({
      data: balance,
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const update = async (
  balance: Omit<Balance, "idAuto" | "updatedAt" | "createdAt" | "userId">
) => {
  const { id, usdAmount, pesosAmount, state } = balance;
  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");
    const balanceInformation = await prisma.balance.update({
      where: {
        id,
      },
      data: {
        usdAmount,
        pesosAmount,
        state,
        updatedAt: new Date(currentDate), // date in format yyyy-mm-dd
      },
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const balance = {
  getBalanceById,
  getAllsBalances,
  getBalanceOpenedByDate,
  getBalancePendingClose,
  saveNewBalance,
  update,
};

export default balance;
