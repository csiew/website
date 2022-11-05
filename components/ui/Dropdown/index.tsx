import React from "react";

type DropdownOption = {
  label?: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

const Dropdown = ({ options, selectedValue, setSelectedValue }: DropdownProps) => {
  const updateSelectedValue = (ev?: any) => {
    setSelectedValue(ev.target.value);
  };

  return (
    <select value={selectedValue} onChange={updateSelectedValue}>
      {
        options.map((option) => (
          <option
            key={option.value}
            value={option.value} >
            {option.label ?? option.value}
          </option>
        ))
      }
    </select>
  );
};

export default Dropdown;
