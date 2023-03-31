import { ChangeEventHandler, MouseEventHandler, RefObject } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type TextFieldProps = BaseComponentProps & {
  variant?: "text" | "email" | "password" | "number" | "multiline";
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  autoFocus?: boolean;
  forwardedRef?: RefObject<any>;
  onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
