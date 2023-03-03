import React, { useState } from "react";
// import { BreadCrumbComp } from "../../components/BreadCrumb";
import { AntButton } from "../../components/controls/AntButton";
import { SliderSlickTwo } from "../../components/SliderSlickTwo";
import { FaFilter, FaListUl, FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line, RiMenuUnfoldLine } from "react-icons/ri";

import { IoMdClose } from "react-icons/io";
import { BsHeart, BsFilterRight, BsHeartFill } from "react-icons/bs";
import { ProdPriceRowSection } from "../../components/ExtraContent";
import { AntSelectDropDown } from "../../components/controls/AntSelectDropDown";
import Presentation from "../stentor/presentation";
import { CheckboxComp } from "../../components/controls/CheckboxComp";
import { getBrandFilteredProducts, getBrandProductsFilters } from "@actions";
import { useRouter } from "next/router";
import Breadcrumbs, { BreadcrumbItem } from "../../components/BreadCrumb";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

const SortOptions = [
  {
    value: "price_asc",
    label: "PRIX CROISSANT",
  },
  { value: "price_desc", label: "PRIX DÉCROISSANT" },
  { value: "best_sel", label: "MEILLEURS VENTES " },
  { value: "most_pop", label: "PLUS POPULAIRES" },
];

export async function getServerSideProps(context) {
  let query = context.query;
  let queryPayload = {};
  queryPayload = Object.assign(
    {},
    query.group ? { group_id: query.group } : null,
    query.state ? { state_id: query.state } : null,
    query.search ? { search: query.search } : null,
    query.priceFrom ? { price_from: query.priceFrom } : null,
    query.priceTo ? { price_to: query.priceTo } : null,
    query.sort ? { order_by: query.sort.split("_")[0] } : null,
    query.sort ? { order_direction: query.sort.split("_")[1] } : null,
    { page: 1 }

  );

  const filters = await getBrandProductsFilters(query?.brand);
  const products = await getBrandFilteredProducts(query?.brand, queryPayload);

  return {
    props: {
      filters: filters?.data || {},
      products: products?.products?.data || [],
      count: products?.productCount || 0,
      brandName: products?.brand_name || "",
      brandImage: products?.brand_image || "/assets/calque_135.png",
      presentation: products?.presentation || {},
      meta: products?.products?.meta || {}
    },
  };
}

const Stentor = ({
  filters,
  products,
  count,
  brandName,
  presentation,
  brandImage,
  meta
}) => {
  const router = useRouter();
  const [isActiveNum, setIsActiveNum] = useState(1);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [filterToggleState, setFilterToggleState] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [productsItem, setProductItems] = useState(products || []);
  const [productMeta, setProductMeta] = useState(meta || null);


  const handleChange = (num) => {
    setIsActiveNum(num);
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 3000);
  };

  const query = router.query;
  const updateRouterWithQuery = (q) => {
    router.push({
      pathname: "/marques/" + query.brand,
      query: { ...q },
    });
  };

  const handleChangeFilters = (key, value) => {
    const newquery = { ...query };
    delete newquery.brand;
    let isExistQuery = Object.keys(newquery).includes(key);
    if (isExistQuery) {
      let isValueExist = newquery[key].split(",").includes(value.toString());
      if (!isValueExist) {
        newquery[key] = newquery[key].concat(`,${value}`);
        updateRouterWithQuery(newquery);
      } else {
        let values = newquery[key]
          .split(",")
          .filter((item) => item != value.toString())
          .join(",");
        console.log(values, "values");
        if (values) {
          newquery[key] = values;
        } else {
          delete newquery[key];
        }
        updateRouterWithQuery(newquery);
      }
    } else {
      let query = {
        ...newquery,
        [key]: value,
      };
      updateRouterWithQuery(query);
    }
  };
  const listener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      const newquery = { ...query };
      delete newquery.brand;
      const { name, value } = event.target;
      console.log({ name, value, newquery });
      if (!value) {
        delete newquery[name];
        updateRouterWithQuery(newquery);
      } else {
        newquery[name] = value;
        updateRouterWithQuery(newquery);
      }
    }
  };
  const handleClearFilters = () => {
    router.push({
      pathname: "/marques/" + query.brand,
    });
  };

  const handleSort = (key, value) => {
    const newquery = { ...query };
    delete newquery.brand;
    newquery[key] = value;
    updateRouterWithQuery(newquery);
  };

  const ColComp = ({
    rowTitle = "fanfare pour le millenaire de...",
    rowSubTitle = "trompette",
    italicTextBlack = "Parramon H./Louchard J.M",
    newPrice = "950€ TTC",
    discPercentage,
    image,
    productId,
    slug,
  }) => {
    const dispatch = useDispatch();
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
      <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex justify-content-between col-12">
        <div className="clarinettes_filter_result_image_card d-flex">
          <div className="clarinettes_filter_image d-flex align-items-center">
            <img src={image} height="148px" alt={rowTitle} />
          </div>
          <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center ms-2 ms-sm-4">
            <div className="prod_main_heading jost_font text-uppercase text-dark mb-3">
              <div className=" text-uppercase">
                <Link passHref href={`/products/${slug}`}>
                  <a className="clarinettes_filter_main_heading  text-dark">
                    {rowTitle}
                  </a>
                </Link>
              </div>
            </div>
            <div className="prod_sub_heading jost_font text-uppercase mb-3 text-dark">
              {rowSubTitle}
            </div>
            <div className="prod_sub_heading_one jost_font text-dark mb-2">
              {italicTextBlack}
            </div>
          </div>
        </div>
        <div className="clarinettes_filter_result_price_card d-flex">
          {discPercentage ? (
            <div className="prod_result_dicount_card jost_font h-100 px-1 px-sm-3 d-flex align-items-center ms-1 ms-sm-0 me-0 me-sm-5">
              -{discPercentage}
            </div>
          ) : null}
          <div className="f-flex ps-2 ps-sm-5">
            <div className="prod_featured_price theme_primary_color">
              {newPrice}
            </div>
            {/* <div className="clarinettes_filter_price_multiply_contianer d-flex mt-2">
            <div className="clarinettes_filter_price_multiply_black text-dark me-1">
              OU
            </div>
            <div className="clarinettes_filter_price_multiply_theme theme_primary_color">
              6 X 119,33€
            </div>
          </div> */}

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
    rowTitle,
    rowSubTitle,
    italicTextBlack,
    newPrice,
    oldPrice,
    discPercentage,
    image,
    productId,
    slug,
  }) => {
    console.log({ productId });
    const dispatch = useDispatch();
    const addToCart = (productId) => {
      console.log("Row");
      let object = {
        product_id: productId,
        quantity: 1,
        type: 1,
      };

      dispatch(addProductToCart(object));
    };

    return (
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3 flex-column px-3 mt-3 mb-4">
        <div className="d-flex justify-content-center w-100 mb-3">
          <img src={image} height="148px" alt={rowTitle} />
          {discPercentage ? (
            <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
              -{discPercentage}
            </div>
          ) : null}
        </div>
        <div className="prod_main_heading jost_font text-uppercase text-dark mb-3">
          <div className=" text-uppercase">
            <Link passHref href={`/products/${slug}`}>
              <a className="clarinettes_filter_main_heading  text-dark">
                {rowTitle}
              </a>
            </Link>
          </div>
        </div>
        <div className="prod_sub_heading jost_font text-uppercase mb-3 text-dark">
          {rowSubTitle}
        </div>
        <div className="prod_sub_heading_one jost_font text-dark mb-2">
          {italicTextBlack}
        </div>

        <ProdPriceRowSection
          newPrice={newPrice}
          oldPrice={oldPrice}
          // onClick={()=> addToCart(productId)}
          productId={productId}
        />
      </div>
    );
  };

  const handleLoadMore = async () => {
    let payload = {
      ...query,
      page: +productMeta?.current_page + 1,
    };
    delete payload.brand

    const products = await getBrandFilteredProducts(query?.brand, payload);

    setProductItems([...productsItem, ...products?.products?.data || []]);
    setProductMeta({ ...products?.products?.meta || {} });
  };


  return (
    <div className="container">

      <Breadcrumbs>
        <BreadcrumbItem isLast>{brandName}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="stentor__container  my-3 my-sm-5">
        <div className="my-4">{/* <BreadCrumbComp /> */}</div>
        <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
          <div className="image_heading mb-4 text-uppercase">{brandName}</div>
          <div className="image_sub_heading text-uppercase">
            <img src={brandImage} alt=" " />
          </div>
        </div>
        <div className="btn__tabs_container d-flex my-3 my-sm-5 w-100 d-none d-md-flex">
          <AntButton
            btnTxt="produits"
            callBackFun={() => handleChange(1)}
            btnClassName={`btn__container text-uppercase rounded-0 me-1 px-3 ${isActiveNum === 1 ? "btn__container_active" : ""
              }`}
          />

          <AntButton
            btnTxt="présentations"
            callBackFun={() => handleChange(2)}
            btnClassName={`btn__container text-uppercase rounded-0 mx-1 px-3 ${isActiveNum === 2 ? "btn__container_active" : ""
              }`}
          />

          <AntButton
            btnTxt="contactez-nous"
            callBackFun={() => handleChange(3)}
            btnClassName={`w-full btn__container text-uppercase rounded-0 mx-1 px-3 ${isActiveNum === 3 ? "btn__container_active" : ""
              }`}
          />
        </div>
        <div className="d-flex align-items-end mb-3 w-100 d-block justify-content-center d-md-none mt-3">
          <AntSelectDropDown isAllowClear={false} placeholder="produits" />
        </div>
        {isActiveNum === 2 ? <Presentation data={presentation} /> : null}

        {isActiveNum === 1 || isActiveNum === 3 ? (
          <div className="col-12 partition_main_container d-flex flex-wrap">
            <div className="col-12 d-none d-md-block col-md-4 col-xl-3">
              <div className="partition_black_container p-4">
                <div className="black_container_heading text-light text-uppercase jost_font mb-3">
                  rechercher une partition
                </div>
                <input
                  type="text"
                  className="partition_input_container w-100 px-3 py-2 my-3"
                  placeholder="Je cherche un titre, un cotage..."
                  name="search"
                  onKeyDown={listener}
                />
              </div>
              <div className="partition_grey_container p-4">
                <div className="heading_with_filter_icon d-flex align-items-center">
                  <FaFilter className="text-dark me-3" />
                  <div className="partition_grey_container_heading text-uppercase">
                    FILTRES
                  </div>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="partition_btn_class text-light w-100 d-flex text-uppercase align-items-center justify-content-between my-5"
                >
                  <RiDeleteBin6Line style={{ fontSize: "20px" }} />
                  supprimer la sélection
                </button>
                <div className="partition_grey_container_heading text-uppercase my-4 ">
                  instruments
                </div>
                {filters &&
                  filters?.groupsData?.map((group, index) => {
                    return (
                      <CheckboxComp
                        key={group?.name + index}
                        checkBoxKey={group?.name + index}
                        checkTxt={`${group?.name} (${group?.count})`}
                        onChange={() =>
                          handleChangeFilters("group", group.group_id)
                        }
                        checked={query?.group
                          ?.split(",")
                          ?.includes(group.group_id?.toString())}
                      />
                    );
                  })}
                <div className="partition_grey_container_heading text-uppercase my-4 ">
                  etat
                </div>

                {filters &&
                  filters?.stateData?.map((group, index) => {
                    return (
                      <CheckboxComp
                        key={group?.name + index}
                        checkBoxKey={group?.name + index}
                        checkTxt={`${group?.name} (${group?.count})`}
                        onChange={() =>
                          handleChangeFilters("state", group.state_id)
                        }
                        checked={query.state
                          ?.split(",")
                          ?.includes(group.state_id?.toString())}
                      />
                    );
                  })}
                <div className="partition_grey_container_heading text-uppercase my-4">
                  prix
                </div>
                <div className="col-12 row">
                  <div className="col-6 text-dark">
                    <div className="mb-1 text-uppercase">de</div>
                    <input
                      type="text"
                      className="w-100 input_dash_class"
                      name="priceFrom"
                      onKeyDown={listener}
                    />
                  </div>
                  <div className="col-6">
                    <div className="text-dark text-uppercase mb-1">à</div>
                    <input
                      type="text"
                      className="w-100 input_dash_class"
                      name="priceTo"
                      onKeyDown={listener}
                    />
                  </div>
                </div>
                <div className="partition_grey_container_heading text-uppercase my-4">
                  offre produit
                </div>

                {/* <CheckboxComp checkTxt="Soldes (11)" />
              <CheckboxComp checkTxt="Vente Flash (8)" /> */}
              </div>
            </div>
            {showFilterSidebar ? (
              <div className="position-fixed filter_sidebar_hide h-100 d-block d-md-none">
                <div className="partition_black_container p-4">
                  <div className="black_container_heading text-light text-uppercase jost_font mb-3 d-flex justify-content-between">
                    rechercher une partition
                    <IoMdClose
                      style={{
                        color: " #fff",
                        transform: "translate(16px, -18px)",
                        fontSize: "27px ",
                      }}
                      className="cursor-pointer d-block d-md-none"
                      onClick={() => setShowFilterSidebar((prev) => !prev)}
                    />
                  </div>
                  <input
                    type="text"
                    className="partition_input_container w-100 px-3 py-2 my-3"
                    placeholder="Je cherche un titre, un cotage..."
                  />
                </div>
                <div className="partition_grey_container p-4">
                  <div className="heading_with_filter_icon d-flex align-items-center">
                    <FaFilter className="text-dark me-3" />
                    <div className="partition_grey_container_heading text-uppercase">
                      FILTRES
                    </div>
                  </div>
                  <button className="partition_btn_class text-light w-100 d-flex text-uppercase align-items-center justify-content-between my-5">
                    <RiDeleteBin6Line style={{ fontSize: "20px" }} />
                    supprimer la sélection
                  </button>

                  <CheckboxComp checkTxt="Accordéon (5)" />
                  <CheckboxComp checkTxt="Accordéons (8)" />
                  <CheckboxComp checkTxt="Alto (12)" />
                  <CheckboxComp checkTxt="Bandoneon (6)" />
                  <CheckboxComp checkTxt="Instrument 5 (8)" />
                  <div className="partition_grey_container_heading text-uppercase my-4 ">
                    etat
                  </div>

                  <CheckboxComp checkTxt="Classique (5)" />
                  <CheckboxComp checkTxt="Contemporain (8)" />
                  <div className="partition_grey_container_heading text-uppercase my-4">
                    prix
                  </div>
                  <div className="col-12 row">
                    <div className="col-6 text-dark">
                      <div className="mb-1 text-uppercase">de</div>
                      <input type="text" className="w-100 input_dash_class" />
                    </div>
                    <div className="col-6">
                      <div className="text-dark text-uppercase mb-1">à</div>
                      <input type="text" className="w-100 input_dash_class" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="col-12 col-md-8 ps-0 ps-md-3 col-xl-9">
              <div className="partition_filter_result_count_card d-flex flex-column flex-sm-row justify-content-between align-items-center my-3 my-sm-0 px-3 px-sm-0">
                <div className="partition_filter_result_left_side d-flex mb-0 mb-sm-5 pt-0 pt-sm-3">
                  <RiMenuUnfoldLine
                    onClick={() => setShowFilterSidebar((prev) => !prev)}
                    style={{ fontSize: "22px" }}
                    className="theme_primary_color me-2 cursor-pointer d-block d-md-none"
                  />
                  <div className="partition_filter_result_count theme_primary_color me-2">
                    {count}
                  </div>
                  <div className="partition_filter_result_text text-dark">
                    RÉSULTATS
                  </div>
                </div>
                <div className="partition_filter_result_right_side d-flex align-items-center mt-3 mt-sm-0 mb-0 mb-sm-5">
                  <BsFilterRight
                    className="text-dark me-2 mb-3 mb-sm-0"
                    style={{ transform: "rotate(180deg)", fontSize: "20px" }}
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
                          item.value ==
                          (query?.sort ? query?.sort : "price_desc")
                      )[0]
                    }
                    options={SortOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(e) => handleSort("sort", e.value)}
                  />
                  <FaListUl
                    className={`text-dark ms-3 cursor-pointer mb-3 mb-sm-0 ${filterToggleState ? "theme_primary_color" : null
                      }`}
                    style={{ fontSize: "25px" }}
                    onClick={() =>
                      setFilterToggleState((prevState) => !prevState)
                    }
                  />
                </div>
              </div>

              <InfiniteScroll
                dataLength={productsItem?.length || 0}
                next={handleLoadMore}
                hasMore={productMeta?.current_page !== productMeta?.last_page}
                loader={
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="loader"></span>
                  </div>
                }
              >
                {filterToggleState ? (
                  <div className="col-12 prod_container d-flex flex-wrap">
                    {

                      productsItem &&
                      productsItem?.length > 0 &&
                      productsItem?.map((product, index) => {
                        return (
                          <RowComp
                            key={product?.title + index}
                            brand={product?.title}
                            rowSubTitle={product?.model}
                            italicTextBlack={product?.category}
                            newPrice={`${product?.price} TTC`}
                            image={product?.image}
                            productId={product?.product_id}
                            slug={`${product?.slug}`}
                          />
                        );
                      })}
                  </div>

                ) : null}




                {filterToggleState ? null : (
                  <div className="col-12 prod_container d-flex flex-wrap">
                    {productsItem &&
                      productsItem?.length > 0 &&
                      productsItem?.map((product, index) => {
                        return (
                          <ColComp
                            key={product?.title + index}
                            rowTitle={product?.title}
                            rowSubTitle={product?.model}
                            italicTextBlack={product?.category}
                            newPrice={`${product?.price} TTC`}
                            image={product?.image}
                            productId={product?.product_id}
                            slug={`${product?.slug}`}
                          />
                        );
                      })}
                  </div>

                )}
              </InfiniteScroll>
            </div>

          </div>

        ) : null}

        <SliderSlickTwo slidesToShowNum={6} />
        <div className="d-flex justify-content-center mt-4 align-items-center">
          <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
        </div>
      </div>

    </div>

  );
};

export default Stentor;
