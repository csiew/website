import React from "react";
import { PlainButtonProps, LinkButtonProps } from "./@types";
import Button from "./PlainButton";
import LinkButton from "./LinkButton";

const ButtonProxy = (props: PlainButtonProps & LinkButtonProps) => {
  const keys = Object.keys(props);
  if (["url", "newTab"].some((k) => keys.includes(k))) {
    return <LinkButton {...props} />;
  }
  return <Button {...props} />;
};

export default ButtonProxy;
