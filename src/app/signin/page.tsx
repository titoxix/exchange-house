"use client";

import { useFormState } from "react-dom";
import { signin } from "@/actions/auth";
import { Button, Input } from "@nextui-org/react";
import { LockIcon } from "@/components/icons/LockIcon";
import { Link } from "@nextui-org/react";

export default function SigninForm() {
  const [state, action, pending] = useFormState(signin, undefined);

  console.log(state);
  return (
    <div className="flex h-screen">
      <div className="w-full max-w-md m-auto">
        <form action={action}>
          <div className="mb-4">
            <Input
              autoFocus
              name="loginName"
              label="Nombre de Usuario"
              variant="bordered"
              isRequired
            />
          </div>
          <div className="mb-6">
            <Input
              name="password"
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Contraseña"
              type="password"
              variant="bordered"
              isRequired
            />
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <Button type="submit" className="w-full" color="primary">
              Entrar
            </Button>
            <label className="text-red-500">{state?.message}</label>

            <label htmlFor="">
              ¿No tienes una cuenta aún?{" "}
              {
                <Link color="primary" href="/signup" aria-current="page">
                  Crear cuenta
                </Link>
              }
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
