import React from "react";
import Link from "next/link";
import { LinkButtonProps } from "./@types";

const LinkButton = ({ children, url, newTab, id, classList, className, style, iconOnly, alt, onClick, disabled, forwardedRef }: LinkButtonProps) => {
  if (url?.startsWith("/")) {
    return (
      <Link
        id={id}
        className={["button", disabled ? "disabled" : undefined, iconOnly ? "iconOnly" : undefined, className, ...classList || []].join(" ")}
        style={style}
        title={alt}
        href={url} rel="noreferrer"
        target={newTab ? "_blank" : undefined}
        ref={forwardedRef}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      id={id}
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
