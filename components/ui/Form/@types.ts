import { FormEvent, ReactElement } from "react";
import { TextFieldProps } from "../TextField/@types";

export type FormProps = {
  className?: string;
  classList?: string[];
  style?: { [k: string]: string | number | boolean };
  children?: string | number | ReactElement | ReactElement[];
  onSubmit?: (ev: FormEvent) => void;
  onChange?: (ev: FormEvent) => void;
  onReset?: (ev: FormEvent) => void;
};

export type FormQuestionProps = TextFieldProps & {
  label?: string;
};
