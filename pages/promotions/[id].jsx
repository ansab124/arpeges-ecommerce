import React, { useEffect, useState } from "react";
import { ContactusCard } from "@components/ContactusCard";
import { AntButton } from "@components/controls/AntButton";
import { SliderSlickTwo } from "@components/SliderSlickTwo";
import { BsHeartFill, BsPlusLg } from "react-icons/bs";
import { BsHeart, BsFilterRight } from "react-icons/bs";
import { FaCartPlus, FaListUl } from "react-icons/fa";
import { AntSelectDropDown } from "@components/controls/AntSelectDropDown";
import { FilterDropdown, ProdPriceRowSection } from "@components/ExtraContent";
import Breadcrumb, { BreadcrumbItem } from "@components/BreadCrumb";
import BreadcrumbSelect from "@components/controls/BreadcrmbSelect";
import InfiniteScroll from "react-infinite-scroll-component";

import Link from "next/link";
import {
  addToCart,
  getCart,
  getIntrumentsFamilies,
  getIntrumentsFilteredProducts,
  getIntrumentsGroups,
  getIntrumentsProductsFilter,
  getPromotionIntruments,
  getPromotionPartitions,
} from "@actions";
import { useRouter } from "next/router";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";

export async function getServerSideProps(context) {
  const promotionType = context.params.id;
  const isInstrument = promotionType == "instruments";
  const response = isInstrument
    ? await getPromotionIntruments({ page: 1 })
    : await getPromotionPartitions({ page: 1 });
  return {
    props: {
      products: response?.products?.data,
      count: response?.productCount,
      isInstrument,
      meta: response?.products?.meta,
    },
  };
}

const SortOptions = [
  {
    value: "price_asc",
    label: "PRIX CROISSANT",
  },
  { value: "price_desc", label: "PRIX DÉCROISSANT" },
  { value: "best_sel", label: "MEILLEURS VENTES " },
  { value: "most_pop", label: "PLUS POPULAIRES" },
];

const ClarinettesSib = ({
  type,
  filters = [],
  products = [],
  categories = [],
  count = 0,
  categoryTitle = "",
  breadcrumbs = [],
  instrumentGroups = [],
  instrumentFamilies = [],
  isInstrument,
  meta = {},
}) => {
  const [filterToggleState, setFilterToggleState] = useState(false);
  const [productItems, setProductItems] = useState(products || []);
  const [productMeta, setProductMeta] = useState(meta || null);
  const router = useRouter();
  const query = router.query;

  const handleLoadMore = async () => {
    let payload = {
      page: +productMeta?.current_page + 1,
    };
    const instruments = isInstrument
      ? await getPromotionIntruments(payload)
      : await getPromotionPartitions(payload);
    setProductItems([...productItems, ...instruments?.products?.data] || []);
    setProductMeta({ ...instruments?.products?.meta });
  };

  return (
    <div className="clarinettes__container container my-3 my-sm-5">
      <div className="my-4">
        {/* <BreadCrumbComp /> */}
        <Breadcrumb>
          <BreadcrumbItem isLast>promotions</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="col-12 d-flex flex-wrap mb-5">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4 text-uppercase">Promotions</div>
            {/* <div className="image_sub_heading">
              INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div> */}
          </div>
        </div>
        <div className="col-12 col-lg-3 ps-0 ps-lg-3 mt-5 mt-lg-0">
          <ContactusCard ContactusCardHeight="h-100" />
        </div>
      </div>
      <div className="clarinettes_filter_result_container w-100">
        <div className="clarinettes_filter_result_count_card mb-3 mb-sm-5 d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <div className="clarinettes_filter_result_left_side d-flex">
            <div className="clarinettes_filter_result_count theme_primary_color me-2">
              {count}
            </div>
            <div className="clarinettes_filter_result_text text-dark">
              RÉSULTATS
            </div>
          </div>
          <div className="clarinettes_filter_result_right_side d-flex align-items-center gap-4">
            <FaListUl
              className={`text-dark ms-3 cursor-pointer ${
                filterToggleState ? "theme_primary_color" : null
              } mb-3 mb-sm-0`}
              onClick={() => setFilterToggleState((prevState) => !prevState)}
              size={28}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={productItems?.length || 0}
          next={handleLoadMore}
          hasMore={productMeta?.current_page !== productMeta?.last_page}
          loader={
            <div className="d-flex align-items-center justify-content-center">
              <span className="loader"></span>
            </div>
          }
        >
          {!filterToggleState ? (
            <div className="d-flex flex-column prod_container">
              {productItems &&
                productItems.map((product, index) => {
                  return isInstrument ? (
                    <ColComp
                      productId={product?.product_id}
                      key={product?.title}
                      elTitle={product?.brand}
                      elSubTitle={product?.title}
                      elText={product?.category}
                      newPrice={
                        product?.promo_price
                          ? product?.promo_price
                          : product?.price
                      }
                      discPercentage={product?.discount}
                      oldPrice={product?.promo_price ? product?.price : false}
                      image={product?.image}
                      slug={`${product?.slug}`}
                      // discPercentage={product?.discount}
                      // countPrice="6 X 119,33€"
                    />
                  ) : (
                    <ColPartitionComp
                      key={product?.title + index}
                      rowTitle={product?.title}
                      rowSubTitle={product?.instrument}
                      italicTextBlack={product?.composer}
                      italicTextGrey={product?.cottage}
                      newPrice={`${product?.price} TTC`}
                      showDropDown={false}
                      image={product?.image}
                      slug={product?.slug}
                      formats={product?.formats}
                      productId={product.id}
                      discPercentage={product?.discount}
                    />
                  );
                })}
            </div>
          ) : null}
          {filterToggleState ? (
            <div className="col-12 d-flex flex-wrap prod_container">
              {productItems &&
                productItems.map((product, index) => {
                  return isInstrument ? (
                    <RowComp
                      productId={product?.product_id}
                      key={product?.title}
                      elTitle={product?.brand}
                      elSubTitle={product?.title}
                      elText={product?.category}
                      // discPercentage="20%"
                      newPrice={
                        product?.promo_price
                          ? product?.promo_price
                          : product?.price
                      }
                      discPercentage={product?.discount}
                      oldPrice={product?.promo_price ? product?.price : false}
                      image={product?.image}
                      slug={`${product?.slug}`}
                      // countPrice="6 X 119,33€"
                    />
                  ) : (
                    <RowPartitionComp
                      key={product?.title + index}
                      rowTitle={product?.title}
                      rowSubTitle={product?.instrument}
                      italicTextBlack={product?.composer}
                      italicTextGrey={product?.cottage}
                      newPrice={`${product?.price} TTC`}
                      showDropDown={false}
                      image={product?.image}
                      slug={product?.slug}
                      formats={product?.formats}
                      productId={product.id}
                      discPercentage={product?.discount}
                    />
                  );
                })}
            </div>
          ) : null}
        </InfiniteScroll>

        <div className="clarinettes_filter_result_card mb-3 d-flex justify-content-between"></div>
      </div>
      <SliderSlickTwo slidesToShowNum={6} />
      {/* <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div> */}
    </div>
  );
};

export default ClarinettesSib;

const ColComp = ({
  elTitle,
  elSubTitle,
  elText,
  discPercentage,
  newPrice,
  oldPrice,
  countPrice,
  image,
  slug,
  productId,
}) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.common.error);
  const loading = useSelector((state) => state.common.loading);
  const wishList = useSelector(state => state.cart.wishList)

  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }
  const addToCart = (productId) => {
    console.log("Col");
    let object = {
      product_id: productId,
      quantity: 1,
      type: 1,
    };
    dispatch(addProductToCart(object));
  };

  return (
    <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex justify-content-between">
      <div className="clarinettes_filter_result_image_card d-flex">
        <div className="clarinettes_filter_image d-flex align-items-center">
          <img src={image} alt={elTitle} />
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center ms-2 ms-sm-4">
          <div className=" text-uppercase">
            <Link passHref href={`/products/${slug}`}>
              <a className="clarinettes_filter_main_heading  text-dark">
                {elTitle}
              </a>
            </Link>
          </div>

          <div className="clarinettes_filter_featured_text_one  text-dark text-uppercase">
            {elSubTitle}
          </div>
          <div className="clarinettes_filter_featured_text_two  text-dark">
            {elText}
          </div>
        </div>
      </div>

      <div className="clarinettes_filter_result_price_card d-flex">
        {discPercentage ? (
          <div className=" jost_font  px-1 px-sm-3 d-flex align-items-center ms-1 ms-sm-0 me-0 me-sm-5">
            <span className="prod_result_dicount_card">-{discPercentage}%</span>
          </div>
        ) : null}
        <div className="f-flex ps-2 ps-sm-5">
          <div className="prod_featured_price theme_primary_color">
            {newPrice}
          </div>
          <div className="prod_old_price my-1">{oldPrice}</div>
          <div className="clarinettes_filter_price_multiply_contianer d-flex">
            <div className="clarinettes_filter_price_multiply_black text-dark me-1">
              OU
            </div>
            <div className="clarinettes_filter_price_multiply_theme theme_primary_color">
              {countPrice}
            </div>
          </div>

          <div className="clarinettes_filter_price_cart d-flex theme_primary_color mt-3">
          {
              wishList.includes(productId) ? <BsHeartFill size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} /> :
                <BsHeart size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} />
            }   
            <FaCartPlus onClick={() => addToCart(productId)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RowComp = ({
  elTitle,
  elSubTitle,
  elText,
  discPercentage,
  newPrice,
  countPrice,
  image,
  slug,
  oldPrice,
  productId,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const wishList = useSelector(state => state.cart.wishList)

  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }
  const addToCart = (productId) => {
    console.log("Col");
    let object = {
      product_id: productId,
      quantity: 1,
      type: 1,
    };
    dispatch(addProductToCart(object));
  };
  return (
    <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex flex-column col-6 col-sm-4 col-md-3 px-1 px-sm-3 pb-3">
      <div className="clarinettes_filter_result_image_card d-flex flex-column">
        <div className="clarinettes_filter_image d-flex mb-3 position-relative">
          <div className="plus_container position-absolute fw-bold text-center">
            <BsPlusLg />
          </div>
          <img src={image} alt={elTitle} />
          {discPercentage ? (
            <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
              -{discPercentage}%
            </div>
          ) : null}
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center">
          <div className=" text-uppercase">
            <Link passHref href={`/products/${slug}`}>
              <a className="clarinettes_filter_main_heading  text-dark ">
                {elTitle}
              </a>
            </Link>
          </div>
          <div className="clarinettes_filter_featured_text_one  text-dark text-uppercase">
            {elSubTitle}
          </div>
          <div className="clarinettes_filter_featured_text_two  text-dark">
            {elText}
          </div>
        </div>
      </div>
      <div className="clarinettes_filter_result_price_card d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <div className="prod_featured_price theme_primary_color mb-1">
            {newPrice}
          </div>
          <div className="prod_old_price my-1">{oldPrice}</div>
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
              wishList.includes(productId) ? <BsHeartFill size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} /> :
                <BsHeart size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} />
            } 
          <FaCartPlus onClick={() => addToCart(productId)} />
        </div>
      </div>
    </div>
  );
};

const ColPartitionComp = ({
  rowTitle = "fanfare pour le millenaire de...",
  rowSubTitle = "trompette",
  italicTextBlack = "Parramon H./Louchard J.M",
  italicTextGrey = "IMD173",
  newPrice = "950€ TTC",
  discPercentage,
  image,
  slug,
  formats,
  productId,
  oldPrice,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]?.type);
  const wishList = useSelector(state => state.cart.wishList)

  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }
  let selectFormat = formats?.filter((item) => item.type == selectedFormat)[0];

  newPrice = selectFormat?.promo_price
    ? selectFormat?.promo_price
    : selectFormat?.price;
  oldPrice = selectFormat?.promo_price
    ? selectFormat?.price
    : selectFormat?.promo_price;
  discPercentage = selectFormat?.discount ? `${selectFormat?.discount}%` : null;

  const dispatch = useDispatch();
  const addToCart = (productId) => {
    let object = {
      product_id: productId,
      quantity: 1,
      type: selectedFormat == "digital" ? 2 : 1,
    };
    dispatch(addProductToCart(object));
  };

  return (
    <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex justify-content-between col-12">
      <div className="clarinettes_filter_result_image_card d-flex">
        <div className="clarinettes_filter_image d-flex align-items-center">
          <img src={image} alt={rowTitle} />
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center ms-2 ms-sm-4">
          <div className=" mb-3">
            <Link passHref href={"/partitions/" + slug}>
              <a className="prod_main_heading jost_font text-uppercase text-dark">
                {" "}
                {rowTitle}
              </a>
            </Link>
          </div>
          <div className="prod_sub_heading jost_font text-uppercase mb-3 text-dark">
            {rowSubTitle}
          </div>
          <div className="prod_sub_heading_one jost_font text-dark mb-2">
            {italicTextBlack}
          </div>
          <div className="prod_sub_heading_two jost_font text-uppercase mb-3">
            {italicTextGrey ? italicTextGrey : null}
          </div>
        </div>
      </div>
      <div className="clarinettes_filter_result_price_card d-flex">
        {discPercentage ? (
          <div className="prod_result_dicount_card jost_font  px-1 px-sm-3 d-flex align-items-center ms-1 ms-sm-0 me-0 me-sm-5">
            -{discPercentage}
          </div>
        ) : null}
        <div className="f-flex ps-2 ps-sm-5">
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
          <div className="prod_featured_price theme_primary_color">
            {newPrice}
          </div>
          {oldPrice ? <div className="prod_old_price">{oldPrice}</div> : null}

          <div className="clarinettes_filter_price_cart d-flex theme_primary_color mt-3">
          {
              wishList.includes(productId) ? <BsHeartFill size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} /> :
                <BsHeart size={18} className="cursor-pointer me-3" onClick={() => addProductWishList(productId)} />
            } 
            <FaCartPlus onClick={() => addToCart(productId)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RowPartitionComp = ({
  rowTitle,
  rowSubTitle,
  italicTextBlack,
  italicTextGrey,
  newPrice,
  oldPrice,
  discPercentage,
  image,
  slug,
  formats,
  productId,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]?.type);

  let selectFormat = formats?.filter((item) => item.type == selectedFormat)[0];
  console.log({ selectFormat });

  newPrice = selectFormat?.promo_price
    ? selectFormat?.promo_price
    : selectFormat?.price;
  oldPrice = selectFormat?.promo_price
    ? selectFormat?.price
    : selectFormat?.promo_price;
  discPercentage =
    selectFormat?.discount > 0 ? `${selectFormat?.discount}%` : null;
  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 flex-column px-3 mt-3 mb-4">
      <div className="d-flex justify-content-center w-100 mb-3">
        <img src={image} alt={rowTitle} />
        {discPercentage ? (
          <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
            -{discPercentage}
          </div>
        ) : null}
      </div>
      <div className="prod_main_heading jost_font text-uppercase text-dark mb-3">
        <Link passHref href={"/partitions/" + slug}>
          <a className="prod_main_heading jost_font text-uppercase text-dark">
            {rowTitle}
          </a>
        </Link>
      </div>
      <div className="prod_sub_heading jost_font text-uppercase mb-3 text-dark">
        {rowSubTitle}
      </div>
      <div className="prod_sub_heading_one jost_font text-dark mb-2">
        {italicTextBlack}
      </div>
      <div className="prod_sub_heading_two jost_font text-uppercase mb-3">
        {italicTextGrey}
      </div>

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
      <ProdPriceRowSection
        newPrice={newPrice}
        oldPrice={oldPrice}
        productId={productId}
        format={selectedFormat}
      />
    </div>
  );
};
