import React, { MouseEvent } from "react";
import TextField from "../TextField";
import { FormQuestionProps } from "./@types";

const FormQuestion = ({ style, label, name, forwardedRef, defaultValue, variant, disabled, required, onClick, onChange }: FormQuestionProps) => {
  const focusInput = (ev: MouseEvent<HTMLLabelElement>) => {
    ev.preventDefault();
    forwardedRef?.current.focus();
  };

  return (
    <span className={["question", required ? "required" : ""].join(" ")}>
      {
        label
          ? <label htmlFor={name} onClick={focusInput}>{label}</label>
          : <></>
      }
      <TextField
        variant={variant}
        name={name}
        style={style}
        forwardedRef={forwardedRef}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onClick={onClick}
        onChange={onChange} />
    </span>
  );
};

export default FormQuestion;
