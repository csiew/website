import React from "react";
import Button from "../Button";
import { ButtonVariant } from "../Button/@types";
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
        <small>
          <Button variant={ButtonVariant.PLAIN} callback={closeWindowCallback}>
            Close
          </Button>
        </small>
      </div>
      <div className="modalWindowBody">
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
