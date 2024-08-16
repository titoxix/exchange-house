"use client";

import { useState } from "react";
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
  customers: Customer[];
}

export default function OrderForm({ customers }: Props) {
  const [customerIdValue, setCustomerIdValue] = useState<string>();
  const { register, watch, handleSubmit, setValue } = useForm<InputsType>();
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();

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

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    setOpenBackdrop(true);

    const { message, status } = await fetch("api/orders", {
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
      }),
    }).then((res) => res.json());

    setOpenSnackBar({
      open: true,
      message,
      severity: status === 201 ? "success" : "error",
    });
    setOpenBackdrop(false);
    console.log("response client", message);
    console.log("response client", status);
  };

  return (
    <ModalForm
      modalTitle="Nueva Operación"
      openModalButtonTitle="Nueva Operación"
      sendDataButtonTitle="Guardar"
      onSubmit={handleSubmit(onSubmit)}
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
          label="Tipo de Operación"
          variant="bordered"
          defaultSelectedKeys={["BUY"]}
          placeholder="Tipo"
          isRequired
          {...register("orderType")}
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
          type="number"
          label={
            orderTypeSelected === "BUY" || !orderTypeSelected
              ? "Recibe Dolares Americanos"
              : "Recibe Pesos Uruguayos"
          }
          placeholder="0"
          variant="bordered"
          onChange={(e) => {
            setValue("received", e.target.value);
            setValue("delivered", calculateDeliveredValue());
          }}
          isRequired
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {orderTypeSelected === "BUY" || !orderTypeSelected
                  ? "USD"
                  : "UYU"}
              </span>
            </div>
          }
        />
      }
      {
        <Input
          type="number"
          label="Tipo de cambio"
          placeholder="Ingrese un monto"
          variant="bordered"
          value="39.80"
          isRequired
          {...register("price")}
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
          variant="bordered"
          description="Este campo es calculado automáticamente"
          isRequired
          readOnly
          value={watch("delivered")}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {orderTypeSelected === "BUY" || !orderTypeSelected
                  ? "UYU"
                  : "USD"}
              </span>
            </div>
          }
        />
      }
    </ModalForm>
  );
}
