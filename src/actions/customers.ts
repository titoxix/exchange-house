"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createCustomer } from "@/server/customers";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Nombre debe tener al menos 3 caracteres",
    }),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(3, {
      message: "Apellido debe tener al menos 3 caracteres",
    }),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

export async function registerCustomer(
  prevState: { message: string },
  formData: FormData
) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  try {
    const validatedData = schema.safeParse({
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    });

    if (!validatedData.success) {
      return {
        input: validatedData.error.errors[0].path[0],
        inputMessage: validatedData.error.errors[0].message,
        message: "",
        isError: true,
      };
    }
    const data = await createCustomer({
      name: validatedData.data.name,
      lastName: validatedData.data.lastName,
      email: validatedData.data.email,
      phone: validatedData.data.phone,
      address: validatedData.data.address,
      companyId: session.user.companyId,
    });

    if (!data || data.status !== 201) {
      return {
        input: "",
        inputMessage: "",
        message: "Error al registrar el cliente",
        isError: true,
      };
    }

    revalidatePath("/dashboard/customers");
    return {
      input: "",
      inputMessage: "",
      message: "Cliente registrado",
      isError: false,
      isRegister: true,
    };
  } catch (e) {
    console.error(e);
    return {
      input: "",
      inputMessage: "",
      message: "Error al registrar el cliente",
      isError: true,
    };
  }
}
