import { MouseEvent, ReactElement, RefObject } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type CommonButtonProps = BaseComponentProps & {
  variant?: "plain" | "primary" | "link" | "submit" | "reset";
  children?: string | number | ReactElement | ReactElement[];
  alt?: string;
  forwardedRef?: RefObject<any>;
  onClick?: (ev: MouseEvent) => void;
};

export type PlainButtonProps = CommonButtonProps;

export type LinkButtonProps = CommonButtonProps & {
  children?: string | number | ReactElement | ReactElement[];
  url?: string;
  newTab?: boolean;
};
