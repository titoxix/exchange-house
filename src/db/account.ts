import prisma from "@/libs/prisma";
import { Account, AccountType } from "@prisma/client";

const getAccounts = async (companyIdAuto: number) => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        companyId: companyIdAuto,
      },
      include: {
        customer: true,
      },
    });

    return accounts;
  } catch (error) {
    throw error;
  }
};

const getAccount = async (id: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  } catch (error) {
    throw error;
  }
};

const createAccount = async (
  account: Omit<Account, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const newAccount = await prisma.account.create({
      data: {
        id: account.id,
        balance: account.balance,
        accountTypeId: account.accountTypeId,
        companyId: account.companyId,
        customerId: account.customerId,
        currencyId: account.currencyId,
        status: account.status,
      },
    });

    return newAccount;
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (
  idAuto: number,
  balance: Account["balance"],
  status: Account["status"]
) => {
  try {
    const updatedAccount = await prisma.account.update({
      where: {
        idAuto,
      },
      data: {
        balance,
        status,
        updatedAt: new Date(),
      },
    });

    return updatedAccount;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (idAuto: number) => {
  try {
    const deletedAccount = await prisma.account.delete({
      where: {
        idAuto,
      },
    });

    return deletedAccount;
  } catch (error) {
    throw error;
  }
};

//Account types
const getAccountTypes = async (companyIdAuto: number) => {
  try {
    const accountTypes = await prisma.accountType.findMany({
      where: {
        companyId: companyIdAuto,
      },
      include: {
        accounts: true,
      },
    });

    return accountTypes;
  } catch (error) {
    throw error;
  }
};

const getAccountType = async (id: string) => {
  try {
    const accountType = await prisma.accountType.findUnique({
      where: {
        id,
      },
    });

    return accountType;
  } catch (error) {
    throw error;
  }
};

const createAccountType = async (
  accountType: Omit<AccountType, "idAuto" | "updatedAt" | "createdAt">
) => {
  try {
    const newAccountType = await prisma.accountType.create({
      data: {
        id: accountType.id,
        name: accountType.name,
        companyId: accountType.companyId,
      },
    });

    return newAccountType;
  } catch (error) {
    throw error;
  }
};

const deleteAccountType = async (idAuto: number) => {
  try {
    const deletedAccountType = await prisma.accountType.delete({
      where: {
        idAuto,
      },
    });

    return deletedAccountType;
  } catch (error) {
    throw error;
  }
};

const account = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountTypes,
  getAccountType,
  createAccountType,
  deleteAccountType,
};

export default account;
