import { ReactElement } from "react";
import { BaseComponentProps } from "../../../common/@types";

export type CommonButtonProps = BaseComponentProps & {
  children?: string | number | ReactElement | ReactElement[];
  callback?: () => void;
};

export type PlainButtonProps = CommonButtonProps;

export type LinkButtonProps = CommonButtonProps & {
  children?: string | number | ReactElement | ReactElement[];
  url?: string;
  newTab?: boolean;
};
