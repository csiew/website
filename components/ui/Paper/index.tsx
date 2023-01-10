import React from "react";
import { ComposableComponentProps } from "../../../lib/@types";

type PaperProps = ComposableComponentProps & {
  variant?: "plain" | "link-list"
};

const Paper = (
  { variant = "plain", children, classList, className, disabled, style }: PaperProps
) => {
  return (
    <div
      className={["paper", variant, disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default Paper;
