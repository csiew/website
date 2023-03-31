import React, { ReactElement } from "react";

export type BadgeVariant = "plain" | "success" | "warning" | "error";

type BadgeProps = {
  children?: string | ReactElement | ReactElement[];
  variant?: BadgeVariant;
  style?: { [k: string]: any };
}

const Badge = ({ children, variant = "plain", style }: BadgeProps) => {
  return <span className={["badge", variant].join(" ")} style={style}>{children}</span>;
};

export default Badge;
