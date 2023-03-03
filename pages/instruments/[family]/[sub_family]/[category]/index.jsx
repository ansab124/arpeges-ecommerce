import React, { useEffect, useState } from "react";
import { ContactusCard } from "@components/ContactusCard";
import { AntButton } from "@components/controls/AntButton";
import { SliderSlickTwo } from "@components/SliderSlickTwo";
import { BsHeartFill, BsPlusLg } from "react-icons/bs";
import { BsHeart, BsFilterRight } from "react-icons/bs";
import { FaCartPlus, FaListUl } from "react-icons/fa";
import { AntSelectDropDown } from "@components/controls/AntSelectDropDown";
import { FilterDropdown } from "@components/ExtraContent";
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
} from "@actions";
import { useRouter } from "next/router";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";

export async function getServerSideProps(context) {
  const slug = context.params.category;
  let { brand, status, sort } = context.query;
  let query = Object.assign(
    {},
    brand
      ? {
          brand_id: brand,
        }
      : null,
    status ? { state_id: status } : null,
    sort ? { order_by: sort.split("_")[0] } : null,
    sort ? { order_direction: sort.split("_")[1] } : null,
    { page: 1 }
  );
  const filters = await getIntrumentsProductsFilter(slug);
  const products = await getIntrumentsFilteredProducts(slug, query);

  return {
    props: {
      filters: filters?.data || [],
      products: products?.products?.data || [],
      meta: products?.products?.meta,
      categories: products?.categoriesList || [],
      count: products?.productCount || 0,
      categoryTitle: products?.category_title || "",
      breadcrumbs: products?.bread_crumb || [],
      instrumentGroups:
        products?.dropdownsGroup?.map((group) => ({
          label: group?.name,
          value: group?.slug,
        })) || [],
      instrumentFamilies:
        products?.categoryMenu?.map((group) => ({
          label: group?.name,
          value: group?.slug,
        })) || [],
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
  filters,
  products,
  categories,
  count,
  categoryTitle,
  breadcrumbs,
  instrumentGroups,
  instrumentFamilies,
  meta,
}) => {
  const [filterToggleState, setFilterToggleState] = useState(false);
  const [productItems, setProductItems] = useState(products || []);
  const [productMeta, setProductMeta] = useState(meta || null);
  const router = useRouter();
  const query = router.query;

  const updateRouterWithQuery = (q) => {
    router.push({
      pathname: `/instruments/${query.family}/${query.sub_family}/${query.category}`,
      query: { ...q },
    });
  };

  const handleLoadMore = async () => {
    console.log({ query });
    let payload = {
      ...query,
      page: +productMeta?.current_page + 1,
    };
    const instruments = await getIntrumentsFilteredProducts(
      query?.category,
      payload
    );
    console.log({ instruments });

    setProductItems([...productItems, ...instruments?.products?.data] || []);
    setProductMeta({ ...instruments?.products?.meta });
  };

  const handleSort = (key, value) => {
    const newquery = { ...query };
    delete newquery.family;
    delete newquery.sub_family;
    delete newquery.category;
    newquery[key] = value;
    updateRouterWithQuery(newquery);
  };

  const handleChangeFilters = (key, value) => {
    console.log({ key, value });
    const newquery = { ...query };
    delete newquery.family;
    delete newquery.sub_family;
    delete newquery.category;
    let isExistQuery = Object.keys(newquery).includes(key);
    if (isExistQuery) {
      if (value?.length > 0) {
        let query = {
          ...newquery,
          [key]: value?.map((item) => item.value).join(","),
        };
        updateRouterWithQuery(query);
      } else {
        let query = {
          ...newquery,
        };
        delete query[key];
        updateRouterWithQuery(query);
      }
    } else {
      let query = {
        ...newquery,
        [key]: value?.map((item) => item.value).join(","),
      };
      updateRouterWithQuery(query);
    }
  };
  const handleClearFilters = () => {
    router.push({
      pathname: `/instruments/${query.family}/${query.sub_family}/${query.category}`,
    });
  };

  return (
    <div className="clarinettes__container container my-3 my-sm-5">
      <div className="my-4">
        {/* <BreadCrumbComp /> */}
        <Breadcrumb>
          <BreadcrumbItem href="/instruments">INSTRUMENTs</BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSelect
              value={
                instrumentGroups?.filter(
                  (item) => item.value == query.family
                )[0]
              }
              placeholder="Instruments"
              options={instrumentGroups}
              getSlug={(slug) => router.push("/instruments/" + slug.value)}
            />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSelect
              value={
                instrumentFamilies?.filter(
                  (item) => item.value == query.sub_family
                )[0]
              }
              placeholder="families"
              options={instrumentFamilies}
            />
          </BreadcrumbItem>
          {breadcrumbs?.map((item, index) => {
            return (
              <BreadcrumbItem
                key={index}
                isLast={index == breadcrumbs?.length - 1}
              >
                {item?.title}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
      <div className="col-12 d-flex flex-wrap mb-5">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4">TOUS NOS INSTRUMENTS</div>
            <div className="image_sub_heading">
              INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 ps-0 ps-lg-3 mt-5 mt-lg-0">
          <ContactusCard ContactusCardHeight="h-100" />
        </div>
      </div>
      <div className="clarinettes_filter_result_container w-100">
        <FilterDropdown
          filters={filters}
          getFilter={(key, value) => handleChangeFilters(key, value)}
          clearFilter={handleClearFilters}
          router={router}
        />
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
            <BsFilterRight
              className="text-dark me-2 mb-3 mb-sm-0"
              size={44}
              style={{ transform: "rotate(180deg)" }}
            />
            <div className="jost_font clarinettes_filter_button_text text-dark text-uppercase mb-3 mb-sm-0">
              trier:
            </div>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  outline: 0,
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#000",
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  color: isSelected ? "#fff" : "#000",
                  zIndex: 1,
                }),
              }}
              value={
                SortOptions.filter(
                  (item) =>
                    item.value == (query?.sort ? query?.sort : "price_desc")
                )[0]
              }
              options={SortOptions}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(e) => handleSort("sort", e.value)}
            />
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
            <div className="d-flex flex-column">
              {productItems &&
                productItems.map((product, index) => {
                  return (
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
                      // countPrice="6 X 119,33€"
                    />
                  );
                })}
            </div>
          ) : null}
          {filterToggleState ? (
            <div className="col-12 d-flex flex-wrap">
              {productItems &&
                productItems.map((product, index) => {
                  return (
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
                  );
                })}
            </div>
          ) : null}
        </InfiniteScroll>

        <div className="clarinettes_filter_result_card mb-3 d-flex justify-content-between"></div>
      </div>
      <SliderSlickTwo slidesToShowNum={6} />
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div>
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
  const wishList = useSelector(state=>state.cart.wishList)


    const addProductWishList=async(productId)=>{
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
                wishList.includes(productId)?<BsHeartFill size={18}  className="cursor-pointer me-3" onClick={()=>addProductWishList(productId)} />:
                <BsHeart size={18}  className="cursor-pointer me-3" onClick={()=>addProductWishList(productId)} />
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
  const wishList = useSelector(state=>state.cart.wishList)


  const addProductWishList=async(productId)=>{
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
                wishList.includes(productId)?<BsHeartFill size={18}  className="cursor-pointer" onClick={()=>addProductWishList(productId)} />:
                <BsHeart size={18}  className="cursor-pointer" onClick={()=>addProductWishList(productId)} />
              }
          <FaCartPlus onClick={() => addToCart(productId)} />
        </div>
      </div>
    </div>
  );
};
