import React, { ComponentPropsWithRef } from "react";

export default function PaperListItem(props: ComponentPropsWithRef<any>) {
  return (
    <div
      {...props}
      className={[
        "paper-list-item",
        props.onClick ? "paper-list-item-link" : "",
        props.className
      ].join(" ").trim()}
    >
      {props.children}
    </div>
  );
}
