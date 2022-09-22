import { MouseEvent, ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type AlertProps = BaseComponentProps & {
  variant?: "plain" | "warning" | "error" | "success";
  children?: string | number | ReactElement | ReactElement[];
  onDismiss?: (ev: MouseEvent) => void;
};
