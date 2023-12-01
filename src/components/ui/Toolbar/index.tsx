import React, { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

type ToolbarProps = BaseComponentProps & {
  children?: string | ReactElement | ReactElement[];
}

const Toolbar = ({ children, className, classList, style }: ToolbarProps) => {
  return (
    <div
      className={["toolbar", className, ...classList || []].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default Toolbar;
