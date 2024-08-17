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
  action?: any;
  message?: string;
  children?: React.ReactNode;
  closeModal?: boolean;
  onSubmit?: any;
  resetForm?: () => void;
}

export default function ModalForm(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dynamicCloseModal = () => {
    if (props.closeModal) {
      onOpenChange();
    }
  };

  const onClose = () => {
    onOpenChange();
    if (props.resetForm) {
      props.resetForm();
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        {props.openModalButtonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.modalTitle}
              </ModalHeader>

              <form action={props?.action} onSubmit={props.onSubmit}>
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
                    aria-disabled={props.formStatus}
                    color="primary"
                    onPress={dynamicCloseModal}
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
