import React, { useState, useRef } from "react";
import ProductSlider from "./ProductSlider";
import { AntButton } from "../controls/AntButton";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Rating from "../rating/Rating";
import ProductAudio from "./ProductAudio";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiShare } from "react-icons/hi";
import Select from "../controls/Select";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";

const ProductDetailSection = ({ type, details, productId }) => {

  let isIntrument = type == "instrument" ? true : false;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const loading = useSelector((state) => state.common.loading);
  const [ratingValue, setRatingValue] = useState(0);
  const wishList = useSelector(state => state.cart.wishList)


  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }

  const addToCart = () => {
    console.log("Col");
    let object = {
      product_id: details?.id,
      quantity: quantity,
      type: 1,
    };
    dispatch(addProductToCart(object));
  };



  return (
    <div className="product_detail container">
      {isIntrument ? (
        <h4 className="product_detail-title-brand text-dark text-uppercase">
          <b>{details?.brand}</b> {details?.model || ""}
        </h4>
      ) : (
        <h4 className="product_detail-title text-dark text-uppercase">
          {details?.title}
        </h4>
      )}
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-12 product_detail-slider">
          <ProductSlider images={details?.images} />
          {!isIntrument && <ProductAudio audio={details?.sound_link} />}
          {isIntrument && (
            <div className="product_detail-brand d-flex align-items-center gap-3 mt-3">
              <Image src="/assets/yamaha-brand.png" height={58} width={180} />
              <Link passHref href="/">
                <a className="text-uppercase">VOIR LES PRODUITS YAMAHA</a>
              </Link>
            </div>
          )}
        </div>
        <div className="col-xl-6 col-lg-6 col-12">
          {details?.used && <span className="occasionTag">occasion</span>}
          {details?.discount && (
            <span className="discountTag ms-3">-{details?.discount}%</span>
          )}

          <div className="product_detail_price d-flex flex-column my-4 ">
            <span className="product_detail_price-actual">
              {details?.promo_price ? details?.promo_price : details?.price} TTC
            </span>
            <span className="product_detail_price-discounted">
              {details?.promo_price ? <del>{details?.price} TTC</del> : null}
            </span>
          </div>
          {!isIntrument && (
            <span className="product_detail-author ">PETIT J.</span>
          )}
          <div className="product_detail-options my-5">
            {!isIntrument && <Select />}
            {isIntrument && (
              <>
                <p>
                  <b>OU</b>&nbsp;&nbsp; <span className="sizeTag">6X</span>
                  &nbsp;&nbsp;{" "}
                  <span className="coloredPrice">
                    <b>97,25€</b>{" "}
                  </span>
                  <b>/ mois</b>{" "}
                </p>
                <p className="mt-4">
                  {`jusqu'à`} <b>36 fois</b> avec notre partenaire{" "}
                  <b>SOFINCO</b>
                </p>
              </>
            )}
          </div>
          <div className="product_detail-cart mt-4 ">
            {isIntrument ? (
              <div className="product_detail-cart-title">
                <span className="product_detail-cart-title-colored me-3 text-uppercase">
                  inDISPONIBLE
                </span>
                <span className="disabledText">Expédié sous X semaines</span>
              </div>
            ) : (
              <span className="">DISPONIBLE</span>
            )}
            <div className="d-flex gap-3 mt-2">
              <div className="product_detail-cart_input">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => e.target.value}
                />
                <div className="d-flex flex-column product_detail-cart_input-buttons">
                  <button>
                    <IoMdArrowDropup
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </button>
                  <button>
                    <IoMdArrowDropdown
                      onClick={() =>
                        quantity > 1 ? `${setQuantity(quantity - 1)}` : ""
                      }
                    />
                  </button>
                </div>
              </div>
              <div className="cartButton">
                <AntButton
                  endIcon={<img src="/assets/cart_button.png" />}
                  btnTxt="ajouter au panier"
                  // quantity={quantity}
                  onClick={() => addToCart()}
                />
              </div>
            </div>
          </div>
          <div className="product_detail-rating my-4 d-flex align-items-center gap-4">
            <Rating
              iconSize="l"
              showOutOf={true}
              enableUserInteraction={true}
              onClick={(value) => setRatingValue(value)}
            />
            <span>({ratingValue} avis)</span>
          </div>
          <div className="product_detail-misc">
            <p>
              <span>
                CODE ARTICLE : {details?.code_article} |{" "}
                {details?.ref && `REF : ${details?.ref}`}
                {details?.cottage && `COTAGE : ${details?.cottage}`}
              </span>
            </p>
            {details?.ean13 && <p>EAN13 : {details?.ean13}</p>}
            {details?.guarantee && <p>GARANTIE : {details?.guarantee}</p>}

          </div>
        </div>
      </div>
      <div className="product_detail-share d-flex flex-column gap-3">
        {
          wishList.includes(details?.id) ? <BsHeartFill size={18} className="cursor-pointer" onClick={() => addProductWishList(details?.id)} /> :
            <BsHeart size={18} className="cursor-pointer" onClick={() => addProductWishList(details?.id)} />
        }

        <HiShare size={24} />
      </div>
    </div>
  );
};

export default ProductDetailSection;
