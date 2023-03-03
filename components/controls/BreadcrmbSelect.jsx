import React from "react";
import Select from "react-select";

const BreadcrmbSelect = ({ options, getSlug, placeholder, value }) => {
  return (
    <div className="breadcrmb_select">
      <Select
        components={{
          IndicatorSeparator: () => null,
        }}
        options={options}
        placeholder={placeholder}
        onChange={getSlug}
        value={value}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: "140px",
            border: 0,
            boxShadow: "none",
            fontSize: "14px",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: "#000",
          }),
        }}
      />
    </div>
  );
};

export default BreadcrmbSelect;
