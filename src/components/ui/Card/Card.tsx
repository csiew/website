import React from "react";
import styles from "./Card.module.css";

export default function Card(props: React.ComponentPropsWithRef<any>) {
  return (
    <div {...props} className={styles.card}>
      {props.children}
    </div>
  );
}
