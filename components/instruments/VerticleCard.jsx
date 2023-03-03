import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";
import Link from "next/link";

export const VerticleInstrumentCard = ({
  elTitle,
  elSubTitle,
  elText,
  discPercentage,
  newPrice,
  countPrice,
  image,
  productId,
  formats,
  slug
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const wishList = useSelector(state => state.cart.wishList)


  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }
  const addToCart = (productId) => {
    let object = {
      product_id: productId,
      quantity: 1,
      type: 1,
    };

    dispatch(addProductToCart(object));
  };

  return (
    <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex flex-column px-1 px-sm-3 pb-3">
      <div className="clarinettes_filter_result_image_card d-flex flex-column">
        <div className="clarinettes_filter_image d-flex mb-3 position-relative">
          <div className="plus_container position-absolute fw-bold text-center">
            <BsPlusLg />
          </div>
          <img src={image} alt={elText} />
          {discPercentage ? (
            <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
              -{discPercentage}%
            </div>
          ) : null}
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center">
          <Link href={`/products/${slug}`} passHref>
          <a className="clarinettes_filter_main_heading jost_font text-dark text-uppercase">
            {elTitle}
          </a>
          </Link>
          <div className="clarinettes_filter_featured_text_one jost_font text-dark text-uppercase">
            {elSubTitle}
          </div>
          <div className="clarinettes_filter_featured_text_two jost_font text-dark">
            {elText}
          </div>
        </div>
      </div>
      <div className="clarinettes_filter_result_price_card d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <div className="prod_featured_price theme_primary_color mb-1">
            {newPrice}
          </div>
          <div className="clarinettes_filter_price_multiply_contianer d-flex">
            <div className="clarinettes_filter_price_multiply_black text-dark me-1">
              OU
            </div>
            <div className="clarinettes_filter_price_multiply_theme theme_primary_color">
              {countPrice}
            </div>
          </div>
        </div>

        <div className="clarinettes_filter_price_cart d-flex flex-column theme_primary_color ms-3">
        {
          wishList.includes(details?.id) ? <BsHeartFill size={18} className="cursor-pointer" onClick={() => addProductWishList(details?.id)} /> :
            <BsHeart size={18} className="cursor-pointer" onClick={() => addProductWishList(details?.id)} />
        }
          <FaCartPlus onClick={() => addToCart(productId)} />
        </div>
      </div>
    </div>
  );
};
