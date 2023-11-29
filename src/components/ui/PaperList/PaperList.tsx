import React, { ComponentPropsWithRef } from "react";

export default function PaperList(props: ComponentPropsWithRef<any>) {
  return (
    <div
      {...props}
      className={["paper-list", props.className].join(" ").trim()}
    >
      {props.children}
    </div>
  );
}
