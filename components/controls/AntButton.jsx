
import { addProductToCart } from "@store/thunk/cart";
import React from "react";
import { useDispatch } from "react-redux";

export const AntButton = ({
  btnTxt,
  btnIcon,
  callBackFun,
  btnClassName = "theme_bg_primary_color theme_btn_class px-3 text-light",
  endIcon,
  onClick
}) => {


  return (
    <button
      className={`d-flex justify-content-center align-items-center cursor-pointer ${btnClassName}`}
      onClick={onClick}
    >
      {btnIcon ? btnIcon : null}
      <span> {btnTxt ? btnTxt : null}</span>
      {endIcon && endIcon}
    </button>
  );
};
