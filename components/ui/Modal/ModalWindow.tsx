import React from "react";
import Button from "../Button";
import { ModalWindowProps } from "./@types";

const ModalWindow = ({ children, className, classList, style, disabled, title, closeWindowCallback }: ModalWindowProps) => {
  return (
    <div
      className={["modalWindow", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      <div className="modalWindowHeader">
        <h2>
          {title}
        </h2>
        <Button callback={closeWindowCallback}>
          Close
        </Button>
      </div>
      <div className="modalWindowBody">
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
