import React, { MouseEvent } from "react";
import TextField from "../TextField";
import { TextFieldVariant } from "../TextField/@types";
import { FormQuestionProps } from "./@types";

const FormQuestion = ({ label, name, forwardedRef, variant, required, onClick, onChange }: FormQuestionProps) => {
  const focusInput = (ev: MouseEvent<HTMLLabelElement>) => {
    ev.preventDefault();
    forwardedRef?.current.focus();
  };

  return (
    <span className="question">
      {
        label
          ? <label htmlFor={name} onClick={focusInput}>{label}</label>
          : <></>
      }
      {
        Object.values(TextFieldVariant).map(v => v.valueOf()).includes(variant)
          ? (
            <TextField variant={variant} name={name} forwardedRef={forwardedRef} required={required} onClick={onClick} onChange={onChange} />
          )
          : <></>
      }
    </span>
  );
};

export default FormQuestion;
