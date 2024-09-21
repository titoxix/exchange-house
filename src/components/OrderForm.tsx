"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import ModalForm from "@/components/ModalForm";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "@/interfaces/customer";
import { OrderType } from "@/interfaces/order";
import { customRevalidateTag } from "@/actions/revalidateTag";
import { Balance } from "@/interfaces/balance";

type InputsType = {
  customer: string;
  orderType: OrderType;
  received: string;
  delivered: string;
  price: string;
};

const selectOptions = [
  { value: "BUY", label: "Compra" },
  { value: "SELL", label: "Venta" },
];

interface Props {
  customers: Omit<Customer, "companyId">[];
  originalPrice: number;
  isBalanceOpened: boolean;
  balance: Balance | null;
}

export default function OrderForm({
  customers,
  originalPrice,
  isBalanceOpened,
  balance,
}: Props) {
  const [customerIdValue, setCustomerIdValue] = useState<string>();
  const { register, watch, handleSubmit, setValue } = useForm<InputsType>({
    defaultValues: {
      orderType: "BUY",
    },
  });
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();
  const [formSendingSuccess, setFormSendingSuccess] = useState(false);

  const orderTypeSelected = watch("orderType");

  const calculateDeliveredValue = () => {
    const received = parseFloat(watch("received"));
    const price = parseFloat(watch("price"));
    let value: number;

    if (orderTypeSelected === "SELL") {
      value = received / price;
    } else {
      value = received * price;
    }
    return value.toFixed(2);
  };

  const isFoundsAvailable = () => {
    const delivered = parseFloat(watch("delivered"));

    if (balance && orderTypeSelected === "BUY") {
      return delivered <= balance?.pesosAmount;
    }
    return balance && delivered <= balance?.usdAmount;
  };

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    if (!isFoundsAvailable()) {
      setOpenSnackBar({
        open: true,
        message: "Fondos insuficientes, verifique el saldo en caja.",
        severity: "error",
      });
      return;
    }
    setOpenBackdrop(true);

    const { message, status } = await fetch("../api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerIdValue,
        type: formData.orderType,
        received: formData.received,
        delivered: formData.delivered,
        price: formData.price,
        balanceId: balance?.id,
      }),
    }).then((res) => res.json());

    if (status === 201) {
      setFormSendingSuccess(true);
    }
    customRevalidateTag("/");
    setOpenSnackBar({
      open: true,
      message,
      severity: status === 201 ? "success" : "error",
    });
    setOpenBackdrop(false);
  };

  const resetForm = () => {
    setValue("customer", "");
    setValue("orderType", "BUY");
    setValue("received", "");
    setValue("delivered", "");
    setValue("price", originalPrice.toString());
  };

  useEffect(() => {
    setValue("price", originalPrice.toString());
  }, [originalPrice, setValue]);

  return (
    <ModalForm
      modalTitle="Nueva Operación"
      openModalButtonTitle="Nueva Operación"
      sendDataButtonTitle="Guardar"
      onSubmit={handleSubmit(onSubmit)}
      closeModal={formSendingSuccess}
      resetForm={resetForm}
      openModalButtonDisable={!isBalanceOpened}
    >
      {
        <Autocomplete
          defaultItems={customers}
          isRequired
          variant="bordered"
          label="Cliente"
          placeholder="Buscar por apellido"
          labelPlacement="inside"
          onSelectionChange={(value) => {
            setCustomerIdValue(value as string);
          }}
          {...register("customer")}
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
      }
      {
        <Select
          name="orderType"
          label="Tipo de Operación"
          variant="bordered"
          defaultSelectedKeys={["BUY"]}
          isRequired
          onChange={(e) => {
            setValue("orderType", e.target.value as OrderType);
            setValue("received", "");
            setValue("delivered", "");
          }}
        >
          {(selectOptions || []).map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      }
      {
        <Input
          name="received"
          type="number"
          label={
            orderTypeSelected === "BUY" || !orderTypeSelected
              ? "Recibe Dolares Americanos"
              : "Recibe Pesos Uruguayos"
          }
          placeholder="0"
          variant="bordered"
          value={watch("received")}
          onChange={(e) => {
            setValue("received", e.target.value);
            setValue("delivered", calculateDeliveredValue());
          }}
          isRequired
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {orderTypeSelected === "BUY" || !orderTypeSelected
                  ? "US$"
                  : "$"}
              </span>
            </div>
          }
        />
      }
      {
        <Input
          type="number"
          label="Tipo de cambio"
          name="price"
          placeholder="0"
          variant="bordered"
          defaultValue={originalPrice.toString()}
          isRequired
          onChange={(e) => {
            setValue("price", e.target.value);
            setValue("delivered", calculateDeliveredValue());
          }}
        />
      }
      {
        <Input
          name="delivered"
          type="number"
          label={
            orderTypeSelected === "BUY" || !orderTypeSelected
              ? "Entrega Pesos Uruguayos"
              : "Entrega Dolares Americanos"
          }
          placeholder="0"
          variant="flat"
          description="Este campo es calculado automáticamente"
          isRequired
          readOnly
          value={watch("delivered")}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {orderTypeSelected === "BUY" || !orderTypeSelected
                  ? "$"
                  : "US$"}
              </span>
            </div>
          }
        />
      }
    </ModalForm>
  );
}
