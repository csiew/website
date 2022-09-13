import { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type CommonButtonProps = BaseComponentProps & {
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
