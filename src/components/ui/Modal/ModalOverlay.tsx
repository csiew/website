import React from "react";
import { ModalOverlayProps } from "./@types";

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className="modal-overlay">
      {children}
    </div>
  );
};

export default ModalOverlay;
