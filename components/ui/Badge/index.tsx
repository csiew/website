import React, { ReactElement } from "react";

export type BadgeVariant = "plain" | "success" | "warning" | "error";

type BadgeProps = {
  children?: string | ReactElement | ReactElement[];
  variant?: BadgeVariant;
}

const Badge = ({ children, variant = "plain" }: BadgeProps) => {
  return <span className={["badge", variant].join(" ")}>{children}</span>;
};

export default Badge;
