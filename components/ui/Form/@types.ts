import { FormEvent, ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";
import { TextFieldProps } from "../TextField/@types";

export type FormProps = BaseComponentProps & {
  children?: string | number | ReactElement | ReactElement[];
  onSubmit?: (ev: FormEvent) => void;
  onChange?: (ev: FormEvent) => void;
  onReset?: (ev: FormEvent) => void;
};

export type FormQuestionProps = TextFieldProps & {
  label?: string;
};
