import React from "react";
import { PlainButtonProps, LinkButtonProps } from "./@types";
import PlainButton from "./PlainButton";
import LinkButton from "./LinkButton";

const Button = (props: PlainButtonProps & LinkButtonProps) => {
  switch (props.variant) {
  case "link":
    return <LinkButton {...props} />;
  default:
    return <PlainButton {...props} />;
  }
};

export default Button;
