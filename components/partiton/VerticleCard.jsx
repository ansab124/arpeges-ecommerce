import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FilterDropdown, ProdPriceRowSection } from "../ExtraContent";
export const ColComp = ({
  rowTitle,
  rowSubTitle,
  italicTextBlack,
  italicTextGrey,
  newPrice = 150,
  oldPrice = 99,
  showDropDown,
  discPercentage,
  image,
  productId,
  formats,
  slug
}) => {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]?.type);
  let selectFormat = formats?.filter((item) => item.type == selectedFormat)[0];
  newPrice = selectFormat?.promo_price
    ? selectFormat?.promo_price
    : selectFormat?.price;
  oldPrice = selectFormat?.promo_price
    ? selectFormat?.price
    : selectFormat?.promo_price;
  discPercentage =
    selectFormat?.discount > 0 ? `${selectFormat?.discount}%` : null;

  return (
    <div className="instrument-card flex-column px-3 mt-3 mb-4">
      <div className="position-relative d-flex justify-content-center w-100 mb-3">
        <div className="add_container position-absolute fw-bold text-center">
          <BsPlusLg />
        </div>
        <img src={image} alt={rowTitle} height={150} />
        {discPercentage ? (
          <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
            -{discPercentage}%
          </div>
        ) : null}
      </div>
      <Link href={`/partitions/${slug}`} passHref>
      <a className="prod_main_heading jost_font text-uppercase text-dark mb-3">
        {rowTitle}
      </a>
      </Link>
     
      <div className="prod_sub_heading jost_font text-uppercase mb-3 text-dark">
        {rowSubTitle}
      </div>
      <div className="prod_sub_heading_one jost_font text-dark mb-2">
        {italicTextBlack}
      </div>
      <div className="prod_sub_heading_two jost_font text-uppercase mb-3">
        {italicTextGrey}
      </div>
      <div
        className={`prod_dropdown jost_font text-uppercase mb-3 d-flex text-dark ${
          showDropDown ? null : "d-hidden"
        }`}
      >
        <select
          className="underline_select"
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          {formats?.map((format, index) => {
            return (
              <option key={index} value={format.type}>
                {format?.type}
              </option>
            );
          })}
        </select>
        {/* Numérique <IoIosArrowDown /> */}
      </div>
      <ProdPriceRowSection
        newPrice={newPrice}
        oldPrice={oldPrice}
        productId={productId}
        format={selectedFormat}
      />
    </div>
  );
};
