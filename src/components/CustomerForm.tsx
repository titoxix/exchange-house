"use client";

import { useFormState, useFormStatus } from "react-dom";
import { InputProps } from "@nextui-org/react";
import { registerCustomer } from "@/actions/customers";
import ModalForm from "@/components/ModalForm";

const initialState = {
  message: "",
};

const formInputs: InputProps[] = [
  {
    autoFocus: true,
    label: "Nombre",
    name: "name",
    placeholder: "Nombre del cliente",
    variant: "bordered",
  },
  {
    label: "Apellido",
    name: "lastName",
    placeholder: "Apellido del cliente",
    variant: "bordered",
  },
  {
    label: "Correo electrónico",
    name: "email",
    placeholder: "Correo electrónico del cliente",
    variant: "bordered",
  },
  {
    label: "Teléfono",
    name: "phone",
    placeholder: "Teléfono del cliente",
    variant: "bordered",
  },
  {
    label: "Dirección",
    name: "address",
    placeholder: "Dirección del cliente",
    variant: "bordered",
  },
];

export default function CustomerForm() {
  const [state, formAction] = useFormState(registerCustomer, initialState);
  const { pending } = useFormStatus();

  return (
    <ModalForm
      modalTitle="Registro de cliente"
      openModalButtonTitle="Registrar cliente"
      sendDataButtonTitle="Registrar"
      inputs={formInputs}
      action={formAction}
      formStatus={pending}
      message={state?.message}
    />
  );
}
