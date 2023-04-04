import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, RefObject } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type TextFieldProps = BaseComponentProps & {
  variant?: "text" | "email" | "password" | "search" | "number" | "multiline";
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string;
  required?: boolean;
  autoFocus?: boolean;
  forwardedRef?: RefObject<any>;
  onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
