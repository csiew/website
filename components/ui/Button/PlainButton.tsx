import React from "react";
import { ButtonVariant, PlainButtonProps } from "./@types";

const PlainButton = ({ variant, classList, className, style, children, callback, disabled }: PlainButtonProps) => {
  switch (variant) {
  case ButtonVariant.SUBMIT:
  case ButtonVariant.RESET: {
    let buttonType = "button";
    if (variant === ButtonVariant.SUBMIT)
      buttonType = "submit";
    if (variant === ButtonVariant.RESET)
      buttonType = "reset";
    return (
      <input
        type={buttonType}
        title={children as string}
        className={[disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
        style={style}
        onClick={callback}
        disabled={disabled}
      />
    );
  }
  default: {
    const isPrimary = variant === ButtonVariant.PRIMARY;
    return (
      <button
        className={[isPrimary ? "primary" : "", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
        style={style}
        onClick={callback}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  }
};

export default PlainButton;
