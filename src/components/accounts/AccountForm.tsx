"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { registerCustomer } from "@/actions/customers";
import ModalForm from "@/components/ModalForm";
import { useAppContext } from "@/context";
import { useEffect } from "react";
import { AccountStatus } from "@prisma/client";
import { Customer } from "@/interfaces/customer";

const initialState = {
  input: "",
  message: "",
  inputMessage: "",
  isError: false,
  isRegister: false,
};

const ACCOUNT_STATUS_OPTIONS = [
  { value: AccountStatus.ACTIVE, label: "Activa" },
  { value: AccountStatus.INACTIVE, label: "Inactiva" },
  { value: AccountStatus.CLOSED, label: "Cerrada" },
];

interface Props {
  customers: Omit<Customer, "companyId">[];
}

export default function AccountForm({ customers }: Props) {
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
      modalTitle="Nueva Cuenta"
      openModalButtonTitle="Crear cuenta"
      sendDataButtonTitle="Crear"
      action={formAction}
      formStatus={pending}
      closeModal={!!state?.isRegister}
    >
      {
        <>
          <Autocomplete
            defaultItems={customers}
            isRequired
            variant="bordered"
            label="Cliente"
            placeholder="Buscar por apellido"
            labelPlacement="inside"
            /* onSelectionChange={(value) => {
              setCustomerIdValue(value as string);
            }} */
            //{...register("customer")}
          >
            {(customer) => (
              <AutocompleteItem
                key={customer.id}
                textValue={`${customer.name} ${customer.lastName}`}
                value={customer.id}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">
                      {customer.name} {customer.lastName}
                    </span>
                    <span className="text-tiny text-default-400">
                      Teléfono: {customer.phone}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Select
            name="accountType"
            label="Tipo de cuenta"
            variant="bordered"
            defaultSelectedKeys={["cta"]}
            isRequired
          >
            {[{ value: "cta", label: "Cuenta corriente" }].map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="currency"
            label="Moneda"
            variant="bordered"
            defaultSelectedKeys={["UYU"]}
            isRequired
          >
            {[{ value: "UYU", label: "Pesos Uruguayos" }].map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            name="balance"
            label="Balance"
            autoFocus
            placeholder="Balance inicial de la cuenta"
            variant="bordered"
            isInvalid={state?.input === "name" && !!state?.inputMessage}
            errorMessage={state?.input === "name" && state?.inputMessage}
            isRequired
          />
          <Select
            name="status"
            label="Estado"
            variant="bordered"
            defaultSelectedKeys={[AccountStatus.ACTIVE]}
            isRequired
          >
            {ACCOUNT_STATUS_OPTIONS.map((opt) => (
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
