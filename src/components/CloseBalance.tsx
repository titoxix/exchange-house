"use client";

import { useAppContext } from "@/context";
import Dialog from "./Dialog";
import { Balance } from "@/interfaces/balance";
import { customRevalidateTag } from "@/actions/revalidateTag";

interface Props {
  balance: Balance | null;
}

export default function CloseBalance(props: Props) {
  const { setOpenBackdrop, setOpenSnackBar } = useAppContext();

  const closeBalance = async () => {
    try {
      setOpenBackdrop(true);

      const result = await fetch(`/api/balance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.balance?.id,
          pesosAmount: props.balance?.pesosAmount,
          usdAmount: props.balance?.usdAmount,
          pesosInitialAmount: props.balance?.pesosInitialAmount,
          usdInitialAmount: props.balance?.usdInitialAmount,
          state: "CLOSED",
        }),
        next: { tags: ["balance"] },
      }).then((res) => res.json());

      if (!result || result.status !== 204) {
        setOpenSnackBar({
          open: true,
          message: "Error al cerrar la caja",
          severity: "error",
        });
        setOpenBackdrop(false);
        return;
      }
      customRevalidateTag("balance");
      setOpenSnackBar({
        open: true,
        message: "Caja cerrada correctamente",
        severity: "success",
      });
      setOpenBackdrop(false);
    } catch (error) {
      console.error(error);
      setOpenBackdrop(false);
      setOpenSnackBar({
        open: true,
        message: "A ocurrido un error inesperado",
        severity: "error",
      });
    }
  };

  return (
    <Dialog
      mainTitle="Cerrar caja"
      openButtonTitle="Cerrar caja"
      openButtonColor="danger"
      acceptAction={closeBalance}
      openButtonIsDisabled={!props.balance}
    >
      <p>
        Al cerrar la caja se finalizará el día y no se podrán realizar
        modificaciones.
      </p>
    </Dialog>
  );
}