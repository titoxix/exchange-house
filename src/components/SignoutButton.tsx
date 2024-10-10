"use client";
import { useFormState } from "react-dom";
import { signout } from "@/actions/auth";

export default function SignOut() {
  const [state, action, pending] = useFormState(signout, undefined);
  return (
    <form action={action}>
      <button className="w-full text-start" type="submit">
        Salir
      </button>
    </form>
  );
}
