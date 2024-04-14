import { ComponentPropsWithRef } from "react";
import "./LinkList.css";

export default function LinkList(props: ComponentPropsWithRef<any>) {
  return (
    <section className={["link-list", props.className].join(" ").trim()} {...props}>
      {props.children}
    </section>
  );
}