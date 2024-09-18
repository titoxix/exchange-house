"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { signup } from "@/actions/auth";
import ModalForm from "@/components/ModalForm";
import { useAppContext } from "@/context";
import { useEffect } from "react";

const SELECT_OPTIONS = [
  { value: "ADMIN", label: "Administrador" },
  { value: "USER", label: "Usuario" },
];

export default function UserForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signup, undefined);
  const { setOpenSnackBar } = useAppContext();

  useEffect(() => {
    if (state?.message) {
      setOpenSnackBar({
        open: !!state?.message,
        message: state?.message,
        severity: state?.isError ? "error" : "success",
      });
    }
  }, [state, setOpenSnackBar]);

  return (
    <ModalForm
      modalTitle="Registro de usuario"
      openModalButtonTitle="Registrar usuario"
      sendDataButtonTitle="Registrar"
      action={formAction}
      formStatus={pending}
      closeModal={!!state?.isRegister}
    >
      {
        <>
          <Input
            name="name"
            label="Nombre"
            autoFocus
            placeholder="Nombre del usuario"
            variant="bordered"
            isInvalid={state?.errors?.name && !!state?.errors?.name}
            errorMessage={state?.errors?.name && state?.errors?.name}
            isRequired
          />
          <Input
            name="lastName"
            label="Apellido"
            placeholder="Apellido del usuario"
            variant="bordered"
            isInvalid={state?.errors?.lastName && !!state?.errors?.lastName}
            errorMessage={state?.errors?.lastName && state?.errors?.lastName}
            isRequired
          />
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="Correo electrónico del usuario"
            variant="bordered"
            isInvalid={state?.errors?.email && !!state?.errors?.email}
            errorMessage={state?.errors?.email && state?.errors?.email}
            isRequired
          />
          <Input
            name="loginName"
            label="Nombre de usuario"
            placeholder="Nombre de usuario para iniciar sesión"
            variant="bordered"
            isInvalid={state?.errors?.loginName && !!state?.errors?.loginName}
            errorMessage={state?.errors?.loginName && state?.errors?.loginName}
            isRequired
            description="Ejemplo: nombre.apellido"
          />
          <Input
            name="password"
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            variant="bordered"
            isInvalid={state?.errors?.password && !!state?.errors?.password}
            errorMessage={
              state?.errors?.password &&
              `Contraseña invalida: ${state?.errors?.password}`
            }
            isRequired
          />
          <Input
            name="confirmPassword"
            label="Repetir Contraseña"
            type="password"
            placeholder="Ingrese la contraseña nuevamente"
            variant="bordered"
            isInvalid={
              state?.errors?.confirmPassword && !!state?.errors?.confirmPassword
            }
            errorMessage={
              state?.errors?.confirmPassword && state?.errors?.confirmPassword
            }
            isRequired
          />
          <Select
            name="rol"
            label="Rol del usuario"
            variant="bordered"
            defaultSelectedKeys={["USER"]}
            isRequired
            description="Por defecto es Usuario"
          >
            {(SELECT_OPTIONS || []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </Select>
        </>
      }
    </ModalForm>
  );
}
