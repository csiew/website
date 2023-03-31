import React from "react";
import { TextFieldProps } from "./@types";

const TextField = ({ variant, name, className, classList, style, placeholder, defaultValue, required, autoFocus, disabled, forwardedRef, onClick, onChange }: TextFieldProps) => {
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
        autoFocus={autoFocus}
        disabled={disabled}
        ref={forwardedRef}
        onClick={onClick}
        onChange={onChange}
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
        autoFocus={autoFocus}
        disabled={disabled}
        ref={forwardedRef}
        onClick={onClick}
        onChange={onChange}
      >
      </input>
    );
  }
};

export default TextField;
