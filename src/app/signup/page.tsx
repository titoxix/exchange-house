"use client";

import { useFormState } from "react-dom";
import { signup } from "@/actions/auth";
import { LockIcon } from "@/components/icons/LockIcon";
import { Link, Image, Input, Button } from "@nextui-org/react";

export default function SigninForm() {
  const [state, action, pending] = useFormState(signup, undefined);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="flex items-center mb-6">
          <Image className="w-16 h-16 mr-2" src="/logo.svg" alt="logo" />
          <p className="font-semibold text-2xl text-white">Currency Exchange</p>
        </div>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-900 border-zinc-800">
          <h3 className="text-xl font-bold text-center mt-4">
            Registro de usuario
          </h3>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form action={action}>
              <div className="mb-4">
                <Input
                  name="companyName"
                  label="Nombre de la empresa"
                  autoFocus
                  placeholder="El nombre que recibe su empresa"
                  variant="bordered"
                  isInvalid={state?.errors?.name && !!state?.errors?.name}
                  errorMessage={state?.errors?.name && state?.errors?.name}
                  isRequired
                />
              </div>
              <div className="mb-4">
                <Input
                  name="name"
                  label="Nombre"
                  autoFocus
                  placeholder="Nombre completo"
                  variant="bordered"
                  isInvalid={state?.errors?.name && !!state?.errors?.name}
                  errorMessage={state?.errors?.name && state?.errors?.name}
                  isRequired
                />
              </div>
              <div className="mb-4">
                <Input
                  name="lastName"
                  label="Apellido"
                  placeholder="Apellido completo"
                  variant="bordered"
                  isInvalid={
                    state?.errors?.lastName && !!state?.errors?.lastName
                  }
                  errorMessage={
                    state?.errors?.lastName && state?.errors?.lastName
                  }
                  isRequired
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  label="Correo electrónico"
                  placeholder="Un correo electrónico válido"
                  variant="bordered"
                  isInvalid={state?.errors?.email && !!state?.errors?.email}
                  errorMessage={state?.errors?.email && state?.errors?.email}
                  isRequired
                  description="Usaremos este correo para validar su cuenta"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="loginName"
                  label="Nombre de usuario"
                  placeholder="Nombre de usuario para inicio de sesión"
                  variant="bordered"
                  isInvalid={
                    state?.errors?.loginName && !!state?.errors?.loginName
                  }
                  errorMessage={
                    state?.errors?.loginName && state?.errors?.loginName
                  }
                  isRequired
                  description="Ejemplo: nombre.apellido"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="password"
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  variant="bordered"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  isInvalid={
                    state?.errors?.password && !!state?.errors?.password
                  }
                  errorMessage={
                    state?.errors?.password &&
                    `Contraseña invalida: ${state?.errors?.password}`
                  }
                  isRequired
                />
              </div>
              <div className="mb-4">
                <Input
                  name="confirmPassword"
                  label="Repetir Contraseña"
                  type="password"
                  placeholder="Ingrese la contraseña nuevamente"
                  variant="bordered"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  isInvalid={
                    state?.errors?.confirmPassword &&
                    !!state?.errors?.confirmPassword
                  }
                  errorMessage={
                    state?.errors?.confirmPassword &&
                    state?.errors?.confirmPassword
                  }
                  isRequired
                />
              </div>
              <div className="flex flex-col space-y-2 text-center">
                <Button type="submit" className="w-full" color="primary">
                  Registrame
                </Button>
                <label>{state?.message}</label>

                <label htmlFor="">
                  ¿Ya tienen una cuenta?{" "}
                  {
                    <Link color="primary" href="/signin" aria-current="page">
                      Ir a la página de login
                    </Link>
                  }
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
