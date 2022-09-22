import { ChangeEventHandler, MouseEventHandler, RefObject } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export enum TextFieldVariant {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  MULTILINE = "multiline"
}

export type TextFieldProps = BaseComponentProps & {
  variant: TextFieldVariant;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  forwardedRef?: RefObject<any>;
  onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
