import React, { RefObject } from "react";
import { ComposableComponentProps } from "../../../lib/@types";

type PaperProps = ComposableComponentProps & {
  variant?: "plain" | "link-list",
  forwardedRef?: RefObject<any>;
};

const Paper = (
  { variant = "plain", id, children, classList, className, disabled, style, forwardedRef }: PaperProps
) => {
  return (
    <div
      id={id}
      className={["paper", variant, disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

export default Paper;
