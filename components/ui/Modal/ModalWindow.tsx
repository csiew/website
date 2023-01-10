import React from "react";
import { MdClose } from "react-icons/md";
import Button from "../Button";
import { ModalWindowProps } from "./@types";

const ModalWindow = ({ children, className, classList, style, disabled, title, closeWindowCallback }: ModalWindowProps) => {
  return (
    <div
      className={["modal-window", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      <div className="modal-windowHeader">
        <h2>
          {title}
        </h2>
        <Button onClick={closeWindowCallback} alt="Close" iconOnly>
          <MdClose />
        </Button>
      </div>
      <div className="modal-windowBody">
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
