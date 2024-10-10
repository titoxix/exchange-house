"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { register } from "@/actions/user";
import ModalForm from "@/components/ModalForm";
import { useAppContext } from "@/context";
import { useEffect } from "react";

const SELECT_OPTIONS = [{ value: "USD", label: "Dolar" }];

export default function CurrencyForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(register, undefined);
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
      modalTitle="Agregar divisa"
      openModalButtonTitle="Agregar divisa"
      sendDataButtonTitle="Agregar divisa"
      action={formAction}
      formStatus={pending}
      closeModal={!!state?.isRegister}
    >
      {
        <>
          <Input
            name="buyRate"
            label="Tasa de compra"
            autoFocus
            placeholder="Ingrese la tasa de compra"
            variant="bordered"
            isInvalid={state?.errors?.name && !!state?.errors?.name}
            errorMessage={state?.errors?.name && state?.errors?.name}
            isRequired
            description="Ejemplo: 25.10"
          />
          <Input
            name="sellRate"
            label="Tasa de venta"
            placeholder="Ingrese la tasa de venta"
            variant="bordered"
            isInvalid={state?.errors?.lastName && !!state?.errors?.lastName}
            errorMessage={state?.errors?.lastName && state?.errors?.lastName}
            isRequired
            description="Ejemplo: 20.30"
          />
          <Input
            name="marketRate"
            label="Tasa del mercado"
            placeholder="Ingrese la tasa del mercado"
            variant="bordered"
            isInvalid={state?.errors?.email && !!state?.errors?.email}
            errorMessage={state?.errors?.email && state?.errors?.email}
            description="Ejemplo: 21.30"
          />
          {/*           <Select
            name="curency"
            label="Divisa"
            variant="bordered"
            defaultSelectedKeys={["USD"]}
            isRequired
            description="Seleccione la divisa"
          >
            {(SELECT_OPTIONS || []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </Select> */}
        </>
      }
    </ModalForm>
  );
}
