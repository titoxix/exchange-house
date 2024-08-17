"use client";

import { useFormState, useFormStatus } from "react-dom";
import { input, Input } from "@nextui-org/react";
import { registerCustomer } from "@/actions/customers";
import ModalForm from "@/components/ModalForm";
import { useAppContext } from "@/context";
import { useEffect } from "react";

const initialState = {
  input: "",
  message: "",
  inputMessage: "",
  isError: false,
  isRegister: false,
};

export default function CustomerForm() {
  const { pending, data, action } = useFormStatus();
  const [state, formAction] = useFormState(registerCustomer, initialState);
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();

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
      modalTitle="Registro de cliente"
      openModalButtonTitle="Registrar cliente"
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
            placeholder="Nombre del cliente"
            variant="bordered"
            isInvalid={state?.input === "name" && !!state?.inputMessage}
            errorMessage={state?.input === "name" && state?.inputMessage}
            isRequired
          />
          <Input
            name="lastName"
            label="Apellido"
            placeholder="Apellido del cliente"
            variant="bordered"
            isInvalid={state?.input === "lastName" && !!state?.inputMessage}
            errorMessage={state?.input === "lastName" && state?.inputMessage}
            isRequired
          />
          <Input
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="Correo electrónico del cliente"
            variant="bordered"
          />
          <Input
            type="tel"
            name="phone"
            label="Teléfono/Celular"
            placeholder="Teléfono ó celular del cliente"
            variant="bordered"
          />
          <Input
            name="address"
            label="Dirección"
            placeholder="Dirección del cliente"
            variant="bordered"
          />
        </>
      }
    </ModalForm>
  );
}
