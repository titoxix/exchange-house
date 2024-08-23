"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import ModalForm from "./ModalForm";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { customRevalidateTag } from "@/actions/revalidateTag";

interface Props {
  operation: "dollars" | "pesos" | "both";
  balanceOpened?: boolean;
}

const modalButtonTitle = {
  dollars: "(USD) Aporte dolares",
  pesos: "(UYU) Aporte pesos",
  both: "Abrir caja",
};

const modalTitle = {
  dollars: "Aporte de dolares",
  pesos: "Aporte de pesos",
  both: "Abrir caja",
};

type InputsType = {
  dollars: number;
  pesos: number;
};

export default function BalanceForm({
  operation,
  balanceOpened = false,
}: Props) {
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();
  const [formSendingSuccess, setFormSendingSuccess] = useState(false);
  const { register, handleSubmit } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    const { dollars, pesos } = formData;

    if (
      (!dollars && !pesos) ||
      (dollars.toString() === "0" && pesos.toString() === "0")
    ) {
      setOpenSnackBar({
        open: true,
        message: "No se puede abrir una caja sin aportes",
        severity: "error",
      });
      return;
    }
    setOpenBackdrop(true);

    const { message, status } = await fetch("api/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usdInitialAmount: formData.dollars,
        pesosInitialAmount: formData.pesos,
        usdAmount: formData.dollars,
        pesosAmount: formData.pesos,
        state: "OPEN",
      }),
      next: { tags: ["balance"] },
    }).then((res) => res.json());

    if (status === 201) {
      setFormSendingSuccess(true);
    }
    customRevalidateTag("balance");
    setOpenSnackBar({
      open: true,
      message,
      severity: status === 201 ? "success" : "error",
    });
    setOpenBackdrop(false);
  };
  return (
    <ModalForm
      modalTitle={modalTitle[operation]}
      openModalButtonTitle={modalButtonTitle[operation]}
      sendDataButtonTitle={operation === "both" ? "Abrir" : `Hacer aporte`}
      onSubmit={handleSubmit(onSubmit)}
      closeModal={formSendingSuccess}
      openModalButtonDisable={balanceOpened}
    >
      {(operation === "dollars" || operation === "both") && (
        <Input
          type="number"
          label="Dolares"
          placeholder="0"
          variant="bordered"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">USD</span>
            </div>
          }
          {...register("dollars")}
        />
      )}
      {(operation === "pesos" || operation === "both") && (
        <Input
          type="number"
          label="Pesos"
          placeholder="0"
          variant="bordered"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">UYU</span>
            </div>
          }
          {...register("pesos")}
        />
      )}
    </ModalForm>
  );
}
