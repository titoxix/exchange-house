"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
//import { createSession, deleteSession } from "@/libs/session";
import { createUser } from "@/server/users";
import { Rol } from "@/interfaces/profile";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../auth";
import { revalidatePath } from "next/cache";

const RolTypes: z.ZodType<Rol> = z.enum(["ADMIN", "USER"]);

const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres." })
      .trim(),
    email: z
      .string()
      .email({ message: "Por favor ingrese un correo electrónico válido." })
      .trim(),
    loginName: z
      .string()
      .min(4, {
        message: "El nombre de usuario debe tener al menos 4 caracteres",
      })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Deberia tener almenos 8 caracteres" })
      .regex(/[a-zA-Z]/, { message: " al menos una letra mayúscula" })
      .regex(/[0-9]/, { message: " al menos un número" })
      .regex(/[^a-zA-Z0-9]/, {
        message: " y contener al menos un carácter especial.",
      })
      .trim(),
    confirmPassword: z.string(),
    rol: RolTypes,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      isError?: boolean;
      isRegister?: boolean;
    }
  | undefined
  | null;

export async function signup(state: FormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      loginName: formData.get("loginName"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      rol: formData.get("rol"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 2. Prepare data for insertion into database
    const { name, lastName, email, loginName, password, rol } =
      validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      {
        name,
        email,
        lastName,
      },
      loginName,
      rol,
      hashedPassword
    );
    if (!newUser) {
      return {
        message: "Se produjo un error al registrar el usuario.",
        isError: true,
        isRegister: false,
      };
    }
    revalidatePath("/dashboard/users");
    return {
      message: "Usuario registrado.",
      isError: false,
      isRegister: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Se produjo un error inesperado.",
      isError: true,
      isRegister: false,
    };
  }
}

export async function signin(state: FormState, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    return {
      message: "Correo o contraseña incorrectos.",
    };
  }
  redirect("/dashboard");
}

export async function signout() {
  //deleteSession();
  await signOut();
  redirect("/login");
}
