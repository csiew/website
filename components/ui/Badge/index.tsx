import React, { ReactElement } from "react";

type BadgeProps = {
  children?: string | ReactElement | ReactElement[];
  variant?: "plain" | "success" | "warning" | "error";
}

const Badge = ({ children, variant = "plain" }: BadgeProps) => {
  return <span className={["badge", variant].join(" ")}>{children}</span>;
};

export default Badge;
