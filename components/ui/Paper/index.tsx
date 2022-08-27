import React, { ReactElement } from "react";

type PaperProps = {
  children?: ReactElement | ReactElement[];
  classList?: string[];
  className?: string;
  disabled?: boolean;
  style?: { [k: string]: string | number };
};

const Paper = (
  { children, classList, className, disabled, style }: PaperProps
) => {
  return (
    <div
      className={["paper", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default Paper;
