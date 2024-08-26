"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface Props {
  mainTitle: string;
  openButtonTitle: string;
  openButtonIsDisabled?: boolean;
  openButtonColor?:
    | "danger"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "secondary";
  children?: React.ReactNode;
  acceptAction?: () => void;
}

export default function Dialog(props: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOnPress = () => {
    const { acceptAction } = props;
    if (acceptAction) {
      acceptAction();
    }
    onOpenChange();
  };

  return (
    <>
      <Button
        color={props.openButtonColor || "primary"}
        isDisabled={props.openButtonIsDisabled || false}
        onPress={onOpen}
      >
        {props.openButtonTitle}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.mainTitle}
              </ModalHeader>
              <ModalBody>{props.children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleOnPress}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
