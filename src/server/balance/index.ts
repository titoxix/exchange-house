import BalanceDB from "@/db/balance";
import { Balance } from "@/interfaces/balance";
import { OrderType } from "@/interfaces/order";
import { adapterDataToFront } from "@/adapters/balance";
import { v4 as uuidv4 } from "uuid";

export const getBalanceById = async (id: string) => {
  try {
    return await BalanceDB.getBalanceById(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBalanceOpenedByDate = async (date: string) => {
  try {
    const result = await BalanceDB.getBalanceOpenedByDate(date);
    return result ? adapterDataToFront(result) : null;
  } catch (error) {
    throw error;
  }
};

export const getBalancePendingClose = async (date: string) => {
  try {
    const result = await BalanceDB.getBalancePendingClose(date);
    return result ? adapterDataToFront(result) : null;
  } catch (error) {
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

export const foundsAvailable = async (
  balanceId: string,
  deliveredAmount: number,
  orderType: OrderType
) => {
  const balance = await getBalanceById(balanceId);

  if (balance && orderType === "BUY") {
    return deliveredAmount <= balance?.pesosAmount;
  }
  return balance && deliveredAmount <= balance?.usdAmount;
};
