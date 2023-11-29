import { ComponentPropsWithRef, ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

export type ModalCommonProps = ComponentPropsWithRef<any> & {
  closeWindowCallback?: () => void;
  title?: string;
};

export type ModalOverlayProps = ModalCommonProps;

export type ModalWindowProps = BaseComponentProps & ModalCommonProps;
