import { Customer } from "@/interfaces/customer";
import { saveCustomer } from "@/db/customers";
import { v4 as uuidv4 } from 'uuid';


interface Response {
    error?: string,
    message?: string,
    status: number
    data: Customer | null
}

export const createCustomer = async ({
    name,
    lastName,
    email,
    phone,
    address
}: Omit<Customer, "id">): Promise<Response> => {
    try {
        const id = uuidv4();

        if (!name || !lastName) {
            return {
                status: 400,
                error: "Bad Request",
                message: "All fields are required",
                data: null
            }
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
            return {
                status: 500,
                error: "Internal Server Error",
                message: "An error occurred while trying to create a new customer",
                data: null
            }
        }

        return {
            status: 201,
            message: "Customer created successfully",
            data: {
                id: newCustomer.id,
                name: newCustomer.name,
                lastName: newCustomer.lastName,
                email: newCustomer.email,
                phone: newCustomer.phone,
                address: newCustomer.address,
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while trying to create a new customer",
            data: null
        }
    }
}