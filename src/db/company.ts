import prisma from "@/libs/prisma";
import { Company } from "@prisma/client";

const createCompany = async (
  company: Omit<Company, "idAuto" | "createdAt" | "updatedAt">
) => {
  try {
    const newCompany = await prisma.company.create({
      data: {
        id: company.id,
        name: company.name,
        address: company.address,
        phone: company.phone,
        email: company.email,
      },
    });

    return newCompany;
  } catch (error) {
    throw error;
  }
};

const getCompanyByIdAuto = async (idAuto: number) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        idAuto,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  } catch (error) {
    throw error;
  }
};

const getCompanyById = async (companyId: string) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  } catch (error) {
    throw error;
  }
};

const getCompanyByName = async (name: string) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        name,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  } catch (error) {
    throw error;
  }
};

const company = {
  createCompany,
  getCompanyByIdAuto,
  getCompanyById,
  getCompanyByName,
};

export default company;
