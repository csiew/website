import React from "react";
import { TextFieldProps } from "./@types";

const TextField = ({ variant, name, className, classList, style, placeholder, defaultValue, required, disabled, forwardedRef }: TextFieldProps) => {
  switch (variant) {
  case "multiline":
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={[className, ...classList || []].join(" ")}
        style={style}
        required={required}
        disabled={disabled}
        ref={forwardedRef}
      >
      </textarea>
    );
  default:
    return (
      <input
        type={variant}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={[className, ...classList || []].join(" ")}
        style={style}
        required={required}
        disabled={disabled}
        ref={forwardedRef}
      >
      </input>
    );
  }
};

export default TextField;
