"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@nextui-org/react";
import { registerAccountTypeAction } from "@/actions/account";
import ModalForm from "@/components/ModalForm";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { AccountType } from "@/interfaces/account";

const initialState = {
  input: undefined,
  message: "",
  inputMessage: undefined,
  isError: false,
  isRegister: false,
};

interface Props {
  isEdit?: boolean;
  accountTypeData?: AccountType;
}

export default function AccountTypeForm({ isEdit, accountTypeData }: Props) {
  const { pending, data, action } = useFormStatus();
  const [state] = useFormState(
    (payload: any) => registerAccountTypeAction(accountTypeData?.id, payload),
    initialState
  );
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();
  const [value, setValue] = useState(accountTypeData?.name);
  const formAction = registerAccountTypeAction.bind(null, accountTypeData?.id);

  console.log("AccountTypeForm -> data", data);
  console.log("AccountTypeForm -> state", state);
  console.log("AccountTypeForm -> pending", pending);

  /* useEffect(() => {
    if (state?.message) {
      setOpenSnackBar({
        open: !!state?.message,
        message: state?.message,
        severity: state?.isError ? "error" : "success",
      });
    }
  }, [state, setOpenSnackBar]); */

  return (
    <ModalForm
      modalTitle={isEdit ? "Editar tipo de cuenta" : "Crear tipo de cuenta"}
      openModalButtonTitle="Crear tipo de cuenta"
      sendDataButtonTitle={isEdit ? "Editar" : "Crear"}
      action={formAction}
      formStatus={pending}
      closeModal={state?.isRegister}
      isEditButton={isEdit}
    >
      {
        <>
          <Input
            name="accountName"
            label="Nombre de la cuenta"
            autoFocus
            placeholder="Nombre de la cuenta"
            variant="bordered"
            value={value}
            onValueChange={setValue}
            isInvalid={state?.input === "accountName" && !!state?.inputMessage}
            errorMessage={state?.input === "accountName" && state?.inputMessage}
            isRequired
            description="Ejemplo: Cuenta corriente"
          />
        </>
      }
    </ModalForm>
  );
}
