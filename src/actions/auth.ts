"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
//import { createSession, deleteSession } from "@/libs/session";
import { createUserSubscriber } from "@/server/users";
import ActiveTokenDB from "@/db/activeToken";
import { Role } from "@/interfaces/profile";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../auth";
import { sendEmail } from "@/utils/mail";

const RoleTypes: z.ZodType<Role> = z.enum(["ADMIN", "USER"]);

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
    email: z.string().email({ message: "Correo electrónico inválido." }).trim(),
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
    companyName: z
      .string()
      .min(2, {
        message: "La nombre de la compania debe tener al menos 2 caracteres",
      })
      .trim(),
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
      companyName: formData.get("companyName"),
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      loginName: formData.get("loginName"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 2. Prepare data for insertion into database
    const { name, lastName, email, loginName, password, companyName } =
      validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = {
      name: companyName,
    };

    /* const newUser = await createUserSubscriber(
      {
        name,
        email: email || null,
        lastName,
      },
      loginName,
      "SUBSCRIBER",
      hashedPassword,
      newCompany
    );
    if (!newUser) {
      return {
        message: "Se produjo un error al registrar el usuario.",
        isError: true,
        isRegister: false,
      };
    }

    //For any reason the profile is not created
    if (!newUser.profile) {
      return {
        message: "Se produjo un error al registrar el usuario.",
        isError: true,
        isRegister: false,
      };
    }

    const profileId = newUser.profile.idAuto;
    const token = await ActiveTokenDB.createToken(profileId);

    const { error } = await sendEmail(
      ["mat.360z@gmail.com"],
      newUser.name,
      token.token
    ); */

    const { error } = await sendEmail(
      ["mat.360z@gmail.com"],
      "Matias Martinez",
      "asdasdasdasdasdasa123123"
    );

    if (error) {
      return {
        message: "Se produjo un error al enviar el correo de activación.",
        isError: true,
        isRegister: false,
      };
    }

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
      loginName: formData.get("loginName"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error: any) {
    if (error?.cause?.message === "User is not active") {
      return {
        message: "El usuario no está activo.",
      };
    }
    return {
      message: "Usuario o contraseña no válidos.",
    };
  }
  redirect("/dashboard");
}

export async function signout() {
  //deleteSession();
  await signOut();
  redirect("/signin");
}
