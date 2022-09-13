import React from "react";
import { LinkButtonProps } from "./@types";

const LinkButton = ({ children, url, newTab, classList, className, style, callback, disabled }: LinkButtonProps) => {
  return (
    <a
      className={["button", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
      href={url} rel="noreferrer"
      target={newTab ? "_blank" : undefined}
      onClick={callback}
    >
      {children}
    </a>
  );
};

export default LinkButton;
