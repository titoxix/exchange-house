import prisma from "@/libs/prisma";
import { Customer } from "@/interfaces/customer";

export const getAlls = async () => {
    try {
        const customers = await prisma.customers.findMany();
        
        return customers;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const saveCustomer = async (customer:Customer) => {
    try {
        const newCustomer = await prisma.customers.create({
            data: {
                id: customer.id,
                name: customer.name,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
            }
          })
        
        return newCustomer;

    } catch (error) {
        console.log(error)
        return null;
    }
}