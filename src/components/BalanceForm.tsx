"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import ModalForm from "./ModalForm";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { customRevalidateTag } from "@/actions/revalidateTag";
import { Balance } from "@/interfaces/balance";

interface Props {
  operation: "dollars" | "pesos" | "both";
  balanceOpened?: boolean;
  balance?: Balance | null;
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
  balance,
}: Props) {
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();
  const [formSendingSuccess, setFormSendingSuccess] = useState(false);
  const { register, handleSubmit } = useForm<InputsType>();

  const calculateNewAmount = (amount: number, balanceAmount: number) => {
    const result = Number(balanceAmount) + Number(amount);
    return result;
  };

  const updateBalance = async (formData: InputsType) => {
    const { dollars, pesos } = formData;

    const { message, status } = await fetch("api/balance", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: balance?.id,
        usdInitialAmount: balance?.usdInitialAmount,
        pesosInitialAmount: balance?.pesosInitialAmount,
        usdAmount:
          operation === "dollars"
            ? calculateNewAmount(dollars, balance?.usdAmount || 0)
            : balance?.usdAmount,
        pesosAmount:
          operation === "pesos"
            ? calculateNewAmount(pesos, balance?.pesosAmount || 0)
            : balance?.pesosAmount,
        state: balance?.state,
      }),
      next: { tags: ["balance"] },
    }).then((res) => res.json());

    customRevalidateTag("balance");
    setOpenSnackBar({
      open: true,
      message,
      severity: status === 204 ? "success" : "error",
    });
  };

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    const { dollars, pesos } = formData;

    if (operation !== "both" && balance) {
      updateBalance(formData);
      return;
    }
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
