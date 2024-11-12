import CurrencyDB from "@/db/currency";
import { getCompanyById } from "@/server/company";
import { v4 as uuidv4 } from "uuid";

export const getCurrencies = async () => {
  try {
    const currencies = await CurrencyDB.getCurrencies();
    return currencies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrency = async (id: string) => {
  try {
    const currency = await CurrencyDB.getCurrency(id);
    return currency;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCurrency = async ({
  name,
  symbol,
  companyId,
  flag,
}: {
  name: string;
  symbol: string;
  companyId: string;
  flag: string;
}) => {
  try {
    const company = await getCompanyById(companyId as string);
    if (!company) {
      throw new Error("Company not found");
    }
    const newCurrency = await CurrencyDB.createCurrency({
      id: uuidv4(),
      name,
      symbol,
      companyId: company.idAuto,
      flag,
    });
    return newCurrency;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCurrency = async ({
  id,
  name,
  symbol,
  flag,
}: {
  id: string;
  name: string;
  symbol: string;
  flag: string;
}) => {
  try {
    const updatedCurrency = await CurrencyDB.updateCurrency({
      id,
      name,
      symbol,
      flag,
    });
    return updatedCurrency;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCurrency = async (id: string) => {
  try {
    const currency = await CurrencyDB.getCurrency(id);
    if (!currency) {
      throw new Error("Currency not found");
    }
    const deletedCurrency = await CurrencyDB.deleteCurrency(currency.idAuto);
    return deletedCurrency;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
