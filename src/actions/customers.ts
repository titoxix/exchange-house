"use server";

import { revalidatePath } from "next/cache";
import { z } from 'zod'
import { createCustomer } from '@/server/customers'


const schema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(3,{
        message: "Nombre debe tener al menos 3 caracteres",
    }),
    lastName: z.string({
        required_error: "Last name is required",
    }).min(3,{
        message: "Apellido debe tener al menos 3 caracteres",
    
    }),
    email: z.string(),
    phone: z.string({
        required_error: "Phone is required",
    }).min(6,{
        message: "Teléfono debe tener al menos 6 caracteres",
    }),
    address: z.string(),
})

export async function registerCustomer(prevState: { message: string },formData: FormData){

    try {
        const validatedData = schema.safeParse({
            name: formData.get('name'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        })

        if(!validatedData.success){
            return { message: validatedData.error.errors[0].message };
        }
        const data = await createCustomer(validatedData?.data);

        if (!data) {
            return { message: "Error al registrar el cliente" };
        }

        revalidatePath("/");
        return { message: `Cliente registrado` };
    
      } catch (e) {
        return { message: "Error al registrar el cliente" };
      }
}