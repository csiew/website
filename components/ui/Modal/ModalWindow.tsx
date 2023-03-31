import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Button from "../Button";
import { ModalWindowProps } from "./@types";

const ModalWindow = ({ children, className, classList, style, disabled, title, closeWindowCallback }: ModalWindowProps) => {
  const handleClickOutside = (ev: MouseEvent) => {
    if ((ev.target as any).className === "modal-overlay" && closeWindowCallback) {
      closeWindowCallback();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={["modal-window", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      <div className="modal-window-header">
        <h2>
          {title}
        </h2>
        <Button onClick={closeWindowCallback} alt="Close" iconOnly>
          <MdClose />
        </Button>
      </div>
      <div className="modal-window-body">
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
