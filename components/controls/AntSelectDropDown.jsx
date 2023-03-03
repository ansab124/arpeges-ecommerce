import React from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    fontFamily: `"Jost", sans-serif !important`,
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    minHeight: "32px",
    height: "32px",
    border: 0,
    borderRadius: 0,
    fontFamily: `"Karla",sans-serif`,
    fontWeight: "700",
    fontSize: "12px",
    outline: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "12px",
    fontWeight: "700",
    fontFamily: `"Karla", sans-serif !important`,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
    border: "1px solid #dfdfdf",
    fontFamily: `"Karla",sans-serif`,
    fontWeight: "700",
  }),
};

export const AntSelectDropDown = ({
  placeholder,
  varient,
  options = [],
  value,
  onChange,
}) => {
  console.log({ value });
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      varient={varient}
      styles={customStyles}
      placeholder={placeholder}
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={onChange}
      isMulti
      value={value}
    />
  );
};
