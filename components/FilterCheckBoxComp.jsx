import React, { useState } from "react";
import { CheckboxComp } from "./controls/CheckboxComp";

export const FilterCheckBoxComp = ({
  heading = "rubrique",
  filterArr,
  onChange,
  checkedId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let lastIndex = isExpanded ? filterArr.length : 5;

  return (
    <div>
      <div className="partition_grey_container_heading text-uppercase my-4">
        {heading}
      </div>
      {filterArr &&
        filterArr.length > 0 &&
        filterArr.slice(0, lastIndex).map((el, index) => (
          <CheckboxComp
            key={el?.name + index}
            checked={
              typeof checkedId == "object"
                ? checkedId?.includes(`${el.id}`)
                : el.id == checkedId
            }
            // checked={el.id == checkedId}
            checkTxt={`${el?.name} (${el?.count})`}
            onChange={() => onChange(el.id)}
          />
        ))}
      {filterArr?.length > 5 ? (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="d-flex my-3 ant_expand_btn p-0 theme_primary_color"
        >
          See {isExpanded ? "less" : "More"}
        </button>
      ) : null}
    </div>
  );
};
