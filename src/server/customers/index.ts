import { Customer } from "@/interfaces/customer";
import { Customer as CustomerDB } from "@prisma/client";
import {
  saveCustomer,
  getAllsByCompanyId,
  getCustomerById,
} from "@/db/customers";
import { getCompanyById } from "@/server/company";
import { v4 as uuidv4 } from "uuid";

interface Response {
  error?: string;
  message?: string;
  status: number;
}

interface getCustomersResponse extends Response {
  data: Omit<Customer, "companyId">[] | [];
}

interface createCustomersResponse extends Response {
  data: Omit<Customer, "companyId"> | null;
}

export const getCustomers = async (
  companyId: string,
  withIdAuto: boolean = false
): Promise<getCustomersResponse> => {
  try {
    const company = await getCompanyById(companyId as string);

    if (!company) {
      return { message: "Empresa no encontrada", status: 404, data: [] };
    }

    const customers = await getAllsByCompanyId(company.idAuto);

    if (!customers) {
      return { message: "No se encontrarón resultados", status: 404, data: [] };
    }

    const adaptedCustomers: Omit<Customer, "companyId">[] = customers.map(
      (customer) => {
        return {
          ...(withIdAuto && { idAuto: customer.idAuto }),
          id: customer.id,
          name: customer.name,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        };
      }
    );

    return { message: "OK", status: 200, data: adaptedCustomers };
  } catch (error) {
    console.error(error);
    return { error: "Error to get data from DB", status: 500, data: [] };
  }
};

export const getCustomerByGeneratedId = async (
  id: string
): Promise<CustomerDB | null> => {
  try {
    const customer = await getCustomerById(id);

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCustomer = async ({
  name,
  lastName,
  email,
  phone,
  address,
  companyId,
}: Omit<Customer, "id">): Promise<createCustomersResponse> => {
  try {
    const company = await getCompanyById(companyId as string);

    if (!company) {
      return {
        status: 404,
        error: "Not Found",
        message: "Company not found",
        data: null,
      };
    }

    const id = uuidv4();

    if (!name || !lastName) {
      return {
        status: 400,
        error: "Bad Request",
        message: "All fields are required",
        data: null,
      };
    }

    const newCustomer = await saveCustomer({
      id,
      name,
      lastName,
      email,
      phone,
      address,
      companyId: company?.idAuto,
    });

    if (!newCustomer) {
      throw new Error("Error to save customer");
    }

    return {
      status: 201,
      message: "Customer created successfully",
      data: {
        idAuto: newCustomer.idAuto,
        id: newCustomer.id,
        name: newCustomer.name,
        lastName: newCustomer.lastName,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
