import React from "react";
import { FormProps } from "./@types";

const Form = ({ className, classList, style, children, onSubmit, onChange, onReset }: FormProps) => {
  return (
    <form
      className={[className, ...classList || []].join(" ")}
      style={style}
      onSubmit={onSubmit}
      onChange={onChange}
      onReset={onReset}
    >
      {children}
    </form>
  );
};

export default Form;
