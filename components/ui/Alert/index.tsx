import React from "react";
import { MdCheck, MdClose, MdError, MdInfo, MdWarning } from "react-icons/md";
import Button from "../Button";
import { AlertProps } from "./@types";

const Alert = ({ className, classList, style, variant = "plain", children, onDismiss }: AlertProps) => {
  const getIcon = () => {
    switch (variant) {
    case "warning":
      return <MdWarning />;
    case "error":
      return <MdError />;
    case "success":
      return <MdCheck />;
    default:
      return <MdInfo />;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
    case "warning":
    case "error":
    case "success":
      return variant;
    default:
      return "plain";
    }
  };

  return (
    <div className={["alert", getVariantStyle(), className, ...(classList ?? [])].join(" ")} style={style}>
      <div className="message">
        <span className="icon">
          {getIcon()}
        </span>
        {children}
      </div>
      {
        onDismiss
          ? (
            <Button className="dismiss" onClick={onDismiss}>
              <MdClose />
            </Button>
          )
          : <></>
      }
    </div>
  );
};

export default Alert;
