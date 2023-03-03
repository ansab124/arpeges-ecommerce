import React from "react";

export const CheckboxComp = ({
  checkBoxKey = "",
  checkTxt = "",
  children,
  checked,
  onChange,
}) => {
  return (
    <>
      {!children ? (
        <div
          className="text-dark cursor-pointer d-flex  partition_checkbox_container"
          key={checkBoxKey ? checkBoxKey : ""}
        >
          <input
            onChange={onChange}
            className="me-2"
            type="checkbox"
            id={`checkbox` + checkBoxKey + checkTxt}
            checked={checked}
          />
          <label htmlFor={`checkbox` + checkBoxKey + checkTxt}>
            {checkTxt}
          </label>
        </div>
      ) : (
        <div
          className="text-dark cursor-pointer partition_checkbox_container"
          key={checkBoxKey ? checkBoxKey : ""}
        >
          {children}
        </div>
      )}
    </>
  );
};
