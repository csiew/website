import React from "react";
import { ComposableComponentProps } from "../../../lib/@types";

type ButtonGroupProps = ComposableComponentProps & {
  orientation: "horizontal" | "vertical";
}

const ButtonGroup = ({ children, classList, className, id, orientation, style }: ButtonGroupProps) => {
  return (
    <div
      id={id}
      className={["button-group", orientation, className, ...classList ?? []].join(" ")}
      style={style}>
      {children}
    </div>
  );
};

export default ButtonGroup;
