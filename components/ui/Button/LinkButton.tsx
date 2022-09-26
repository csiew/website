import React from "react";
import { LinkButtonProps } from "./@types";

const LinkButton = ({ children, url, newTab, classList, className, style, iconOnly, alt, onClick, disabled, forwardedRef }: LinkButtonProps) => {
  return (
    <a
      className={["button", disabled ? "disabled" : undefined, iconOnly ? "iconOnly" : undefined, className, ...classList || []].join(" ")}
      style={style}
      title={alt}
      href={url} rel="noreferrer"
      target={newTab ? "_blank" : undefined}
      ref={forwardedRef}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default LinkButton;
