import React, { ComponentPropsWithRef } from "react";
import styles from "./Card.module.css";

export default function CardHeader(props: ComponentPropsWithRef<any>) {
  return (
    <div {...props} className={styles.header}>
      {props.children}
    </div>
  );
}
