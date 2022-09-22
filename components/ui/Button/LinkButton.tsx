import React from "react";
import { LinkButtonProps } from "./@types";

const LinkButton = ({ children, url, newTab, classList, className, style, onClick, disabled, forwardedRef }: LinkButtonProps) => {
  return (
    <a
      className={["button", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
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
