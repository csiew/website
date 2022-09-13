import { ReactElement, RefObject } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type ModalCommonProps = {
  children?: string | ReactElement | ReactElement[];
  closeWindowCallback?: () => void;
  title?: string;
};

export type ModalOverlayProps = ModalCommonProps;

export type ModalWindowProps = BaseComponentProps & ModalCommonProps;
