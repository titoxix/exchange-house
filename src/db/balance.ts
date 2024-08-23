import prisma from "@/libs/prisma";
import { CashAudits } from "@prisma/client";
import { getCurrentDate } from "@/utils/dates";

const getAllsBalances = async () => {
  try {
    const balancesInformation = await prisma.cashAudits.findMany();

    return balancesInformation;
  } catch (error) {
    throw error;
  }
};

const getBalanceOpenedByDate = async (date: string) => {
  try {
    const balanceInformation = await prisma.cashAudits.findFirst({
      where: {
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
  balance: Omit<CashAudits, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const balanceInformation = await prisma.cashAudits.create({
      data: balance,
    });

    return balanceInformation;
  } catch (error) {
    throw error;
  }
};

const update = async (
  balance: Omit<CashAudits, "idAuto" | "updatedAt" | "createdAt">
) => {
  const { id, usdAmount, pesosAmount, state } = balance;
  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");
    const balanceInformation = await prisma.cashAudits.update({
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
  getAllsBalances,
  getBalanceOpenedByDate,
  saveNewBalance,
  update,
};

export default balance;
