import { getCompanyById } from "../company";
import { getCustomerByGeneratedId } from "@/server/customers";
import { getCurrency } from "@/server/currency";
import { v4 as uuidv4 } from "uuid";
import AccountDB from "@/db/account";
import { Account } from "@/interfaces/account";

export const getAccounts = async (companyId: string) => {
  try {
    const company = await getCompanyById(companyId as string);

    if (!company) {
      throw new Error("Company not found");
    }
    const accounts = await AccountDB.getAccounts(company.idAuto);
    return accounts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAccount = async (id: string) => {
  try {
    const account = await AccountDB.getAccount(id);
    return account;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAccount = async ({
  balance,
  accountTypeId,
  companyId,
  customerId,
  currencyId,
  status,
}: {
  balance: number;
  accountTypeId: string;
  companyId: string;
  customerId: string;
  currencyId: string;
  status: Account["status"];
}) => {
  try {
    const company = await getCompanyById(companyId as string);
    const accountType = await AccountDB.getAccountType(accountTypeId);
    const customer = await getCustomerByGeneratedId(customerId);
    const currency = await getCurrency(currencyId);

    if (!company) {
      throw new Error("Company not found");
    }
    if (!accountType) {
      throw new Error("Account type not found");
    }
    if (!customer) {
      throw new Error("Customer not found");
    }
    if (!currency) {
      throw new Error("Currency not found");
    }

    const newAccount = await AccountDB.createAccount({
      id: uuidv4(),
      balance,
      accountTypeId: accountType.idAuto,
      companyId: company.idAuto,
      customerId: customer.idAuto,
      currencyId: currency.idAuto,
      status,
    });
    return newAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Account types
export const getAccountTypes = async (companyId: string) => {
  try {
    const company = await getCompanyById(companyId as string);

    if (!company) {
      throw new Error("Company not found");
    }
    const accountTypes = await AccountDB.getAccountTypes(company.idAuto);
    return accountTypes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAccountType = async ({
  accountName,
  companyId,
}: {
  accountName: string;
  companyId: string;
}) => {
  try {
    const company = await getCompanyById(companyId as string);

    if (!company) {
      throw new Error("Company not found");
    }

    const newAccountType = await AccountDB.createAccountType({
      id: uuidv4(),
      name: accountName,
      companyId: company.idAuto,
    });
    return newAccountType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccountType = async (id: string) => {
  try {
    const accountType = await AccountDB.getAccountType(id);
    if (!accountType) {
      throw new Error("Account type not found");
    }
    const deletedAccountType = await AccountDB.deleteAccountType(
      accountType.idAuto
    );
    return deletedAccountType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
