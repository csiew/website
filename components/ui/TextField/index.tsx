import React from "react";
import { TextFieldProps } from "./@types";

const TextField = ({ id, variant, name, className, classList, style, placeholder, defaultValue, value, required, autoFocus, disabled, forwardedRef, onClick, onChange, onFocus, onBlur, onKeyDown }: TextFieldProps) => {
  switch (variant) {
  case "multiline":
    return (
      <textarea
        id={id}
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
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
      </textarea>
    );
  default:
    return (
      <input
        id={id}
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
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
      </input>
    );
  }
};

export default TextField;
