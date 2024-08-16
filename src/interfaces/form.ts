import { InputProps as InputPropsNextUi } from "@nextui-org/react";

export interface InputProps extends InputPropsNextUi {
  name: string;
  inputType?: "text" | "number" | "select" | "hidden";
  options?: { value: string; label: string }[];
  endContent?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
}
