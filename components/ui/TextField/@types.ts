import { RefObject } from "react";

export enum TextFieldVariant {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  MULTILINE = "multiline"
}

export type TextFieldProps = {
  variant: TextFieldVariant;
  name?: string;
  className?: string;
  classList?: string[];
  style?: { [k: string]: string | number | boolean };
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  forwardedRef?: RefObject<any>;
};
