import React from "react";
import { TextFieldProps } from "./@types";

const TextField = ({ variant, name, className, classList, style, placeholder, defaultValue, value, required, autoFocus, disabled, forwardedRef, onClick, onChange, onFocus }: TextFieldProps) => {
  switch (variant) {
  case "multiline":
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        className={[className, ...classList || []].join(" ")}
        style={style}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        ref={forwardedRef}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
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
        onFocus={onFocus}
      >
      </input>
    );
  }
};

export default TextField;
