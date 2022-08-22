import { ReactElement } from "react";

export default (
  props: {
    children?: ReactElement | ReactElement[];
    classList?: string[];
    className?: string;
    disabled?: boolean;
    style?: { [k: string]: string | number };
  }
) => {
  return (
    <div
      className={["paper", props.disabled ? "paper-disabled" : undefined, props.className, ...props.classList || []].join(" ")}
      style={props.style}
    >
      {props.children}
    </div>
  );
};
