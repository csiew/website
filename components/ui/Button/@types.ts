import { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export enum ButtonVariant {
  PLAIN = "plain",
  PRIMARY = "primary",
  LINK = "link",
  SUBMIT = "submit",
  RESET = "reset"
}

export type CommonButtonProps = BaseComponentProps & {
  variant: ButtonVariant;
  children?: string | number | ReactElement | ReactElement[];
  callback?: () => void;
  alt?: string;
};

export type PlainButtonProps = CommonButtonProps;

export type LinkButtonProps = CommonButtonProps & {
  children?: string | number | ReactElement | ReactElement[];
  url?: string;
  newTab?: boolean;
};
