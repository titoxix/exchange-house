"use client";

import { useFormState } from "react-dom";
import { signin } from "@/actions/auth";
import { Button, Input } from "@nextui-org/react";
import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";

export default function SigninForm() {
  const [state, action, pending] = useFormState(signin, undefined);

  return (
    <div className="flex h-screen">
      <div className="w-full max-w-md m-auto">
        <form action={action}>
          <div className="mb-4">
            <Input
              autoFocus
              name="email"
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Correo Electrónico"
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
          <Button type="submit" className="w-full" color="primary">
            Entrar
          </Button>
          <label>{state?.message}</label>
        </form>
      </div>
    </div>
  );
}
