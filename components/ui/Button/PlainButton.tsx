import React from "react";
import { PlainButtonProps } from "./@types";

const PlainButton = ({ variant, id, classList, className, style, iconOnly, alt, children, onClick, disabled, forwardedRef }: PlainButtonProps) => {
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
        alt={alt}
        value={children as string}
        id={id}
        className={[disabled ? "disabled" : undefined, iconOnly ? "iconOnly" : undefined, className, ...classList || []].join(" ")}
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
        id={id}
        className={[isPrimary ? "primary" : "", disabled ? "disabled" : undefined, iconOnly ? "iconOnly" : undefined, className, ...classList || []].join(" ")}
        title={alt}
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
