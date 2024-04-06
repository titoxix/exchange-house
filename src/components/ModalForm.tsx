"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  InputProps,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";

interface Props {
  modalTitle: string;
  openModalButtonTitle: string;
  sendDataButtonTitle: string;
  inputs: InputProps[];
  action: (formData: FormData) => void;
  formStatus: boolean;
  message?: string;
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

              <form action={props.action}>
                <ModalBody>
                  {props.inputs.map((input, index) => (
                    <Input key={index} {...input} />
                  ))}
                  <div>
                    <p>{props.message}</p>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
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
