import React from "react";
import { PlainButtonProps } from "./@types";

const PlainButton = ({ variant, classList, className, style, children, onClick, disabled, forwardedRef }: PlainButtonProps) => {
  switch (variant) {
  case "submit":
  case "reset": {
    let buttonType = "button";
    if (variant === "submit")
      buttonType = "submit";
    if (variant === "reset")
      buttonType = "reset";
    return (
      <input
        type={buttonType}
        title={children as string}
        value={children as string}
        className={[disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
        style={style}
        ref={forwardedRef}
        onClick={onClick}
        disabled={disabled}
      />
    );
  }
  default: {
    const isPrimary = variant === "primary";
    return (
      <button
        className={[isPrimary ? "primary" : "", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
        style={style}
        ref={forwardedRef}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  }
};

export default PlainButton;
