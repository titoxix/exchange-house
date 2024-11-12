"use server";

import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAccountType, deleteAccountType } from "@/server/account";

const schema = z.object({
  accountName: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Nombre debe tener al menos 3 caracteres",
    }),
});

//Account types actions
export async function registerAccountTypeAction(
  id: string | undefined,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  try {
    const validatedData = schema.safeParse({
      accountName: formData.get("accountName"),
    });
    if (!validatedData.success) {
      return {
        input: validatedData.error.errors[0].path[0],
        inputMessage: validatedData.error.errors[0].message,
        isError: true,
        isRegister: false,
      };
    }
    await createAccountType({
      accountName: validatedData.data.accountName,
      companyId: session.user.companyId,
    });

    return {
      message: "Tipo de cuenta registrado correctamente",
      isError: false,
      isRegister: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error al registrar el tipo de cuenta",
      isError: true,
      isRegister: false,
    };
  }
}

export async function deleteAccountTypeAction(id: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  try {
    if (!id) throw new Error("Id is required");

    const result = await deleteAccountType(id);
    console.log("result", result);
    return {
      message: "Tipo de cuenta eliminado correctamente",
      isError: false,
      isDelete: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error al eliminar el tipo de cuenta",
      isError: true,
      isDelete: false,
    };
  }
}
