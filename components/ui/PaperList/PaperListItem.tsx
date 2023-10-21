import React, { ComponentPropsWithRef } from "react";

export default function PaperListItem(props: ComponentPropsWithRef<any>) {
  return (
    <div
      {...props}
      className={["paper-list-item", props.className].join(" ").trim()}
    >
      {props.children}
    </div>
  );
}
