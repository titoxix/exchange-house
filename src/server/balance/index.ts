import BalanceDB from "@/db/balance";
import { Balance } from "@/interfaces/balance";
import { v4 as uuidv4 } from "uuid";

export const getBalanceOpenedByDate = async (date: string) => {
  try {
    return await BalanceDB.getBalanceOpenedByDate(date);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBalance = async (balance: Balance) => {
  try {
    return await BalanceDB.update(balance);
  } catch (error) {
    throw error;
  }
};

export const saveNewBalance = async (
  balance: Omit<Balance, "id" | "state" | "usdAmount" | "pesosAmount">
) => {
  const { usdInitialAmount, pesosInitialAmount } = balance;
  try {
    const id = uuidv4();

    if (usdInitialAmount < 0 || pesosInitialAmount < 0) {
      throw new Error("Invalid amount");
    }

    return await BalanceDB.saveNewBalance({
      id,
      state: "OPEN",
      usdInitialAmount,
      pesosInitialAmount,
      usdAmount: usdInitialAmount,
      pesosAmount: pesosInitialAmount,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
