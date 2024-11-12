//"use client";

//import { useAppContext } from "@/context";
import Dialog from "./Dialog";
//import { customRevalidateTag } from "@/actions/revalidateTag";
import { DeleteIcon } from "@/components/icons/DeleteIcon";

interface Props {
  mainTitle: string;
  openButtonTitle?: string;
  openButtonIsDisabled?: boolean;
  actionButtonTitle: string;
  acceptAction: () => void;
}

export default function DeleteRowElement(props: Props) {
  //const { setOpenBackdrop, setOpenSnackBar } = useAppContext();

  return (
    <Dialog
      mainTitle={props.mainTitle}
      openButtonTitle={props.openButtonTitle || "text"}
      openButtonColor="danger"
      acceptAction={props.acceptAction}
      openButtonIsDisabled={props.openButtonIsDisabled}
      actionButtonTitle={props.actionButtonTitle}
      openButtonIsOnlyIcon
      openButtonIcon={<DeleteIcon />}
    >
      <div>
        <p>
          ¿Esta seguro que desea eliminar este elemento? Esta acción no se puede
          revertir.
        </p>
      </div>
    </Dialog>
  );
}
