import React, { ReactElement } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "plain" | "success" | "warning" | "error";

type BadgeProps = {
  children?: string | ReactElement | ReactElement[];
  variant?: BadgeVariant;
  style?: { [k: string]: any };
}

export default function Badge({ children, variant = "plain", style }: BadgeProps) {
  function getVariantStyle() {
    switch (variant) {
      case "success":
        return styles.variantSuccess;
      case "warning":
        return styles.variantWarning;
      case "error":
        return styles.variantError;
      case "plain":
      default:
        return styles.variantPlain;
    }
  }

  return <span className={[styles.badge, getVariantStyle()].join(" ").trim()} style={style}>{children}</span>;
}
