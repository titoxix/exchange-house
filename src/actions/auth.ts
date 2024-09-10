"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
//import { createSession, deleteSession } from "@/libs/session";
import { createUser } from "@/server/users";
import { Rol } from "@/interfaces/profile";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../auth";

const RolTypes: z.ZodType<Rol> = z.enum(["ADMIN", "USER"]);

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  rol: RolTypes,
});

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined
  | null;

export async function signup(state: FormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      rol: formData.get("rol"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 2. Prepare data for insertion into database
    const { name, email, password, rol } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashedPassword", hashedPassword);

    const newUser = await createUser(
      {
        name,
        email,
        lastName: "",
      },
      rol,
      hashedPassword
    );
    if (!newUser) {
      return {
        message: "An error occurred while creating your account.",
      };
    }
    //await createSession(newUser.id);
  } catch (error) {
    console.error(error);
    return {
      message: "Unexpected error occurred.",
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
