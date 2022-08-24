import { ReactElement } from "react";

export type CommonButtonProps = {
  classList?: string[];
  className?: string;
  callback?: () => void;
  disabled?: boolean;
  style?: { [k: string]: string | number };
};

export type PlainButtonProps = CommonButtonProps & {
  label?: string;
};

export type LinkButtonProps = CommonButtonProps & {
  children?: string | number | ReactElement | ReactElement[];
  url?: string;
  newTab?: boolean;
};
