import React from "react";
import { PlainButtonProps, LinkButtonProps } from "./@types";
import PlainButton from "./PlainButton";
import LinkButton from "./LinkButton";

const Button = (props: PlainButtonProps & LinkButtonProps) => {
  const keys = Object.keys(props);
  if (["url", "newTab"].some((k) => keys.includes(k))) {
    return <LinkButton {...props} />;
  }
  return <PlainButton {...props} />;
};

export default Button;
