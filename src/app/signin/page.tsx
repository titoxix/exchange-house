"use client";
import { useFormState } from "react-dom";
import { signin } from "@/actions/auth";

export default function SigninForm() {
  const [state, action, pending] = useFormState(signin, undefined);

  return (
    <form action={action}>
      <label>
        Email
        <input name="email" type="email" defaultValue="mat.360z@gmail.com" />
      </label>
      <label>
        Password
        <input name="password" type="password" defaultValue="%Perro1234" />
      </label>
      <div>
        <button>Sign In</button>
      </div>
      <label>{state?.message}</label>
    </form>
  );
}

/* import { redirect } from "next/navigation";
import { signIn } from "../../../auth";

export default function SigninForm() {
  return (
    <form
      action={async (formData) => {
        "use server";
        try {
          const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
            //redirect: true,
          });
          console.log("result", result);
        } catch (error) {
          return null;
        }
        redirect("/");
      }}
    >
      <label>
        Email
        <input name="email" type="email" defaultValue="dulce@gmail.com" />
      </label>
      <label>
        Password
        <input name="password" type="password" defaultValue="%Perro1234" />
      </label>
      <div>
        <button>Sign In</button>
      </div>
    </form>
  );
}
 */
