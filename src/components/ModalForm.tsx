"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";

interface Props {
  modalTitle: string;
  openModalButtonTitle: string;
  sendDataButtonTitle: string;
  formStatus?: boolean;
  message?: string;
  children?: React.ReactNode;
  reset?: () => void;
  onSubmit?: any;
}

export default function ModalForm(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        {props.openModalButtonTitle}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.modalTitle}
              </ModalHeader>

              <form onSubmit={props.onSubmit}>
                <ModalBody>
                  {props.children}
                  <div>
                    <p>{props.message}</p>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="reset"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    //onClick={() => props.reset()}
                    aria-disabled={props.formStatus}
                    color="primary"
                  >
                    {props.sendDataButtonTitle}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
