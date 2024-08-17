import { Customer } from "@/interfaces/customer";
import { Customers as CustomerDB } from "@prisma/client";
import { saveCustomer, getAlls, getCustomerById } from "@/db/customers";
import { v4 as uuidv4 } from "uuid";

interface Response {
  error?: string;
  message?: string;
  status: number;
}

interface getCustomersResponse extends Response {
  data: Customer[] | [];
}

interface createCustomersResponse extends Response {
  data: Customer | null;
}

export const getCustomers = async (
  withIdAuto: boolean = false
): Promise<getCustomersResponse> => {
  try {
    const customers = await getAlls();

    if (!customers) {
      return { message: "No se encontrarón resultados", status: 404, data: [] };
    }

    const adaptedCustomers: Customer[] = customers.map((customer) => {
      return {
        ...(withIdAuto && { idAuto: customer.idAuto }),
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      };
    });

    return { message: "OK", status: 200, data: adaptedCustomers };
  } catch (error) {
    console.log(error);
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
}: Omit<Customer, "id">): Promise<createCustomersResponse> => {
  try {
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
