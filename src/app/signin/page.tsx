"use client";

import { useFormState } from "react-dom";
import { signin } from "@/actions/auth";
import { LockIcon } from "@/components/icons/LockIcon";
import { Button, Checkbox, Input, Link, Image } from "@nextui-org/react";

export default function SigninForm() {
  const [state, action, pending] = useFormState(signin, undefined);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6">
          <Image className="w-16 h-16 mr-2" src="/logo.svg" alt="logo" />
          <p className="font-semibold text-2xl text-white">Currency Exchange</p>
        </div>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-900 border-zinc-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold mb-6 leading-tight tracking-tight md:text-2xl text-white">
              Inicia sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" action={action}>
              <div className="flex flex-col">
                <div>
                  <Input
                    autoFocus
                    name="loginName"
                    label="Nombre de Usuario"
                    placeholder="Ingresa tu nombre de usuario"
                    labelPlacement="outside"
                    variant="bordered"
                    isRequired
                  />
                </div>
                <div className="mt-4">
                  <Input
                    name="password"
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    labelPlacement="outside"
                    type="password"
                    variant="bordered"
                    isRequired
                  />
                </div>
                {/* TODO: Pending to create page for recover password */}
                {/* <div className="flex items-center justify-between mt-6">
                  <div className="flex items-start">
                    <Checkbox className="">
                      <span className="text-sm">Recordarme</span>
                    </Checkbox>
                  </div>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline"
                  >
                    ¿Has olvidado tu contraseña?
                  </Link>
                </div> */}
                <div className="flex flex-col gap-4 mt-6">
                  <Button type="submit" className="w-full" color="primary">
                    Entrar
                  </Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿No tienes una cuenta aún?{" "}
                    <Link
                      href="/signup"
                      className="text-sm font-medium hover:underline"
                    >
                      Crear cuenta
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col justify-center text-center text-red-500 mt-4">
                  <label>{state?.message}</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
