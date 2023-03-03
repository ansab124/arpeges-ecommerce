import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";
import { FilterDropdown, ProdPriceRowSection } from "@components/ExtraContent";
import { FaFilter, FaListUl, FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line, RiMenuUnfoldLine } from "react-icons/ri";
import Link from "next/link";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FilterCheckBoxComp } from "@components/FilterCheckBoxComp";
import { CheckboxComp } from "@components/controls/CheckboxComp";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  getPartitionsFilters,
  getFilteredPartitions,
  getEditorAutoComplete,
  getComposerAutoComplete,
} from "@actions";
import { useRouter } from "next/router";
import Select from "react-select";
import Breadcrumb, { BreadcrumbItem } from "@components/BreadCrumb";
import { RiDeleteBin5Fill } from "react-icons/ri";

const SortOptions = [
  {
    value: "price_asc",
    label: "PRIX CROISSANT",
  },
  { value: "price_desc", label: "PRIX DÉCROISSANT" },
  { value: "best_sel", label: "MEILLEURS VENTES " },
  { value: "most_pop", label: "PLUS POPULAIRES" },
];

const OfferOptions = [
  {
    value: "soldes",
    label: "SOLDES",
  },
  { value: "ventes_flash", label: "VENTES FLASH" },
];

export async function getServerSideProps(context) {
  let query = context.query;
  let queryPayload = {};
  queryPayload = Object.assign(
    {},
    query.instrument ? { instrument_id: query.instrument } : null,
    query.rubrique ? { rubrique_id: query.rubrique } : null,
    query.style ? { style_id: query.instrument } : null,
    query.format ? { format_id: query.instrument } : null,
    query.composer ? { composer_id: query.composer } : null,
    query.editor ? { editor_id: query.editor } : null,
    query.search ? { search: query.search } : null,
    query.sort ? { order_by: query.sort.split("_")[0] } : null,
    query.sort ? { order_direction: query.sort.split("_")[1] } : null,
    { page: 1 }
  );

  const filters = await getPartitionsFilters();
  const partitions = await getFilteredPartitions(queryPayload);

  return {
    props: {
      filters: filters?.data || [],
      count: partitions?.productCount || 0,
      partitions: partitions?.data?.data || [],
      meta: partitions?.data?.meta,
    },
  };
}

const Partitions = ({ filters, count, partitions, meta }) => {
  const router = useRouter();
  const [partitionItems, setPartitionItems] = useState(partitions || []);
  const [partitionMeta, setPartitionMeta] = useState(meta || null);
  const [filterToggleState, setFilterToggleState] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editorData, setEditorData] = useState([]);
  const [composerData, setComposerData] = useState([]);
  const [edittorValue, setEditorValue] = useState("");
  const [composerValue, setComposerValue] = useState("");

  const query = router.query;

  const getEditor = async (query) => {
    const response = await getEditorAutoComplete(query);
    setEditorData(
      response.map((item) => ({ label: item.name, value: item.id })) || []
    );
  };
  const getComposer = async (query) => {
    const response = await getComposerAutoComplete(query);
    setComposerData(
      response.map((item) => ({ label: item.name, value: item.id })) || []
    );
  };

  const handleLoadMore = async () => {
    let payload = {
      ...query,
      page: +partitionMeta?.current_page + 1,
    };
    const partitions = await getFilteredPartitions(payload);
    console.log("partitions", partitions);
    setPartitionItems([...partitionItems, ...partitions?.data?.data] || []);
    setPartitionMeta({ ...partitions?.data?.meta });
  };

  useEffect(() => {
    let time;
    if (composerValue) {
      time = setTimeout(() => getComposer(composerValue), 500);
    }
    return () => clearTimeout(time);
  }, [composerValue]);

  useEffect(() => {
    let time;
    if (edittorValue) {
      time = setTimeout(() => getEditor(edittorValue), 500);
    }
    return () => clearTimeout(time);
  }, [edittorValue]);

  const updateRouterWithQuery = (q) => {
    router.push({
      pathname: "/partitions",
      query: { ...q },
    });
  };

  const handleChangeFilters = (key, value) => {
    const newquery = { ...query };
    delete newquery.slug;
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
      delete newquery.slug;
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
  const handleRemoveFilters = (key) => {
    let newQuery = { ...query };
    delete newQuery[key];
    router.push({
      pathname: "/partitions",
      query: newQuery,
    });
  };

  const handleClearFilters = () => {
    router.push({
      pathname: "/partitions",
    });
  };

  const handleSort = (key, value) => {
    const newquery = { ...query };
    delete newquery.brand;
    newquery[key] = value;
    updateRouterWithQuery(newquery);
  };
  console.log(
    "partitionMeta?.current_page !== partitionMeta?.last_page",
    partitionMeta
  );

  return (
    <div className="instrument__container container my-3 my-sm-5">
      <Breadcrumb>
        <BreadcrumbItem isLast>Partitions</BreadcrumbItem>
      </Breadcrumb>
      <div className="my-4">{/* <BreadCrumbComp /> */}</div>
      <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
        <div className="image_heading mb-4 text-uppercase">partitions </div>
        <div className="image_sub_heading text-uppercase">
          librairie musicale
        </div>
      </div>
      <div className="mb-3 mb-sm-5 mt-1 mt-sm-3">
        {/* <FilterDropdown filters={filters} /> */}
        <div className="clarinettes_filter_button text-uppercase text-dark d-flex align-items-center mb-4 flex-wrap justify-content-center justify-content-md-start gap-4">
          <div className="jost_font clarinettes_filter_button_text mb-3 mb-sm-0 ">
            trier :
          </div>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: 14,
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

          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: 14,
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
            options={OfferOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder="OFFRE"
            // onChange={(e) => handleSort("sort", e.value)}
          />
          <RiDeleteBin5Fill
            onClick={handleClearFilters}
            className="ms-3 cursor-pointer mb-3 mb-sm-0"
          />
        </div>
      </div>
      <div className="col-12 partition_main_container row">
        <div className="col-12 d-none d-md-block col-md-4 col-xl-3">
          <div className="partition_black_container p-4">
            <div className="black_container_heading text-light text-uppercase jost_font mb-3">
              rechercher une partition
            </div>
            <input
              type="text"
              name="search"
              className="partition_input_container w-100 px-3 py-2 my-3"
              placeholder="Je cherche un titre, un cotage..."
              onKeyDown={listener}
            />
          </div>
          <div className="partition_grey_container p-4">
            <div className="heading_with_filter_icon d-flex">
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
            <div className="partition_grey_container_heading text-uppercase">
              compositeur
            </div>

            <Select
              className="editor-select"
              placeholder="Je saisis un compositeur"
              options={composerData || []}
              value={composerData?.filter(
                (item) => item.value == query.composer
              )}
              onChange={(e) => {
                if (e) {
                  handleChangeFilters("composer", e.value);
                } else {
                  handleRemoveFilters("composer");
                }
              }}
              onInputChange={(e) => setComposerValue(e)}
              isSearchable={true}
              isClearable
            />
            <FilterCheckBoxComp
              filterArr={filters?.instruments?.map((instrument) => ({
                id: instrument?.instrument_id,
                name: instrument?.name,
                count: instrument?.count,
              }))}
              checkedId={query?.instrument?.split(",")}
              heading="instruments"
              onChange={(value) => handleChangeFilters("instrument", value)}
            />
            <FilterCheckBoxComp
              filterArr={filters?.rubriques?.map((instrument) => ({
                id: instrument?.rubrique_id,
                name: instrument?.name,
                count: instrument?.count,
              }))}
              checkedId={query?.rubrique?.split(",")}
              onChange={(value) => handleChangeFilters("rubrique", value)}
              heading="rubrique"
            />
            <FilterCheckBoxComp
              filterArr={filters?.styles?.map((instrument) => ({
                id: instrument?.style_id,
                name: instrument?.name,
                count: instrument?.count,
              }))}
              checkedId={query?.style?.split(",")}
              onChange={(value) => handleChangeFilters("style", value)}
              heading="style"
            />
            <FilterCheckBoxComp
              filterArr={filters?.formats?.map((instrument) => ({
                id: instrument?.format_id,
                name: instrument?.name,
                count: instrument?.count,
              }))}
              checkedId={query?.format?.split(",")}
              onChange={(value) => handleChangeFilters("format", value)}
              heading="format"
            />
            <div className="partition_grey_container_heading text-uppercase my-4 ">
              éditeur
            </div>
            <Select
              className="editor-select"
              placeholder="Je saisis un éditeur"
              options={editorData || []}
              onChange={(e) => {
                if (e) {
                  handleChangeFilters("editor", e.value);
                } else {
                  handleRemoveFilters("editor");
                }
              }}
              onInputChange={(e) => setEditorValue(e)}
              // defaultValue={colourOptions[0]}
              // isDisabled={isDisabled}
              // isLoading={isLoading}
              isClearable={true}
              // isRtl={isRtl}
              isSearchable={true}
              // name="color"
              // options={colourOptions}
            />
          </div>
        </div>
        {showFilterSidebar ? (
          <div className="position-fixed filter_sidebar_hide h-100 d-block d-md-none">
            <div className="partition_black_container p-4">
              <div className="black_container_heading text-light text-uppercase jost_font mb-2 d-flex justify-content-between">
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
              <div className="heading_with_filter_icon d-flex">
                <FaFilter className="text-dark me-3" />
                <div className="partition_grey_container_heading text-uppercase">
                  FILTRES
                </div>
              </div>
              <button className="partition_btn_class text-light w-100 d-flex text-uppercase align-items-center justify-content-between my-5">
                <RiDeleteBin6Line style={{ fontSize: "20px" }} />
                supprimer la sélection
              </button>
              <div className="partition_grey_container_heading text-uppercase">
                compositeur
              </div>
              <input
                type="text"
                className="partition_input_container w-100 px-3 py-2 my-3"
                placeholder="Je saisis un compositeur"
              />
              <FilterCheckBoxComp
                filterArr={filters?.instruments?.map((instrument) => ({
                  id: instrument?.instrument_id,
                  name: instrument?.name,
                  count: instrument?.count,
                }))}
                checkedId={""}
                heading="instruments"
              />

              <FilterCheckBoxComp
                filterArr={filters?.rubriques?.map((instrument) => ({
                  id: instrument?.rubrique_id,
                  name: instrument?.name,
                  count: instrument?.count,
                }))}
                checkedId={""}
                heading="rubrique"
              />

              <FilterCheckBoxComp
                filterArr={filters?.styles?.map((instrument) => ({
                  id: instrument?.style_id,
                  name: instrument?.name,
                  count: instrument?.count,
                }))}
                checkedId={""}
                heading="style"
              />

              <FilterCheckBoxComp
                filterArr={filters?.formats?.map((instrument) => ({
                  id: instrument?.format_id,
                  name: instrument?.name,
                  count: instrument?.count,
                }))}
                checkedId={""}
                heading="format"
              />
              <div className="partition_grey_container_heading text-uppercase my-4 ">
                éditeur
              </div>
              <input
                type="text"
                className="partition_input_container w-100 px-3 py-2 mb-3"
                placeholder="Je saisis un éditeur"
              />
            </div>
          </div>
        ) : null}
        <div className="col-12 col-md-8 ps-3 col-xl-9">
          <div className="partition_filter_result_count_card d-flex flex-row justify-content-between align-items-center my-3 my-sm-0 px-3 px-sm-0">
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
            <div className="partition_filter_result_right_side d-flex align-items-center mb-0 mb-sm-5">
              <FaListUl
                className={`text-dark ms-3 cursor-pointer mb-0  ${
                  filterToggleState ? "theme_primary_color" : null
                }`}
                style={{ fontSize: "25px" }}
                onClick={() => setFilterToggleState((prevState) => !prevState)}
              />
            </div>
          </div>
          <InfiniteScroll
            dataLength={partitionItems?.length || 0}
            next={handleLoadMore}
            hasMore={partitionMeta?.current_page !== partitionMeta?.last_page}
            loader={
              <div className="d-flex align-items-center justify-content-center">
                <span className="loader"></span>
              </div>
            }
          >
            {filterToggleState ? (
              <div className="col-12 prod_container d-flex flex-wrap">
                {partitionItems &&
                  partitionItems?.length > 0 &&
                  partitionItems?.map((partition, index) => {
                    return (
                      <RowComp
                        key={partition?.title + index}
                        rowTitle={partition?.title}
                        rowSubTitle={partition?.instrument}
                        italicTextBlack={partition?.composer}
                        italicTextGrey={partition?.cottage}
                        newPrice={`${partition?.price} TTC`}
                        showDropDown={false}
                        image={partition?.image}
                        slug={partition?.slug}
                        formats={partition?.formats}
                        productId={partition.id}
                      />
                    );
                  })}
                {/*  */}
              </div>
            ) : null}
            {filterToggleState ? null : (
              <div className="col-12 prod_container d-flex flex-wrap">
                {partitionItems &&
                  partitionItems?.length > 0 &&
                  partitionItems?.map((partition, index) => {
                    return (
                      <ColComp
                        key={partition?.title + index}
                        rowTitle={partition?.title}
                        rowSubTitle={partition?.instrument}
                        italicTextBlack={partition?.composer}
                        italicTextGrey={partition?.cottage}
                        newPrice={`${partition?.price} TTC`}
                        showDropDown={false}
                        image={partition?.image}
                        slug={partition?.slug}
                        formats={partition?.formats}
                        productId={partition.id}
                      />
                    );
                  })}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Partitions;

const ColComp = ({
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

  let selectFormat = formats?.filter((item) => item.type == selectedFormat)[0];

  newPrice = selectFormat?.promo_price
    ? selectFormat?.promo_price
    : selectFormat?.price;
  oldPrice = selectFormat?.promo_price
    ? selectFormat?.price
    : selectFormat?.promo_price;
  discPercentage = selectFormat?.discount ? `${selectFormat?.discount}%` : null;

  const dispatch = useDispatch();
  const wishList = useSelector(state => state.cart.wishList)

  const addProductWishList = async (productId) => {
    dispatch(addToWishList(productId))
  }

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

const RowComp = ({
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
