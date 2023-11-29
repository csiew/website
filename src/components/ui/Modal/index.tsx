import React from "react";
import { ModalWindowProps } from "./@types";
import ModalOverlay from "./ModalOverlay";
import ModalWindow from "./ModalWindow";

const Modal = (props: ModalWindowProps) => {
  return (
    <ModalOverlay>
      <ModalWindow { ...props } />
    </ModalOverlay>
  );
};

export default Modal;
