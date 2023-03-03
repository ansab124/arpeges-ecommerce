import React, { useState } from "react";
import { ContactusCard } from "../../components/ContactusCard";
import { AntButton } from "../../components/controls/AntButton";
import { SliderSlickTwo } from "../../components/SliderSlickTwo";
import { BsHeartFill, BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { BsHeart, BsFilterRight } from "react-icons/bs";
import { FaCartPlus, FaFilter, FaListUl } from "react-icons/fa";
import { RiDeleteBin6Line, RiMenuUnfoldLine } from "react-icons/ri";
import { AntSelectDropDown } from "../../components/controls/AntSelectDropDown";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import { CardTextComponent } from "../../components/ExtraContent";
import { CheckboxComp } from "../../components/controls/CheckboxComp";
import BreadcrumbSelect from "../../components/controls/BreadcrmbSelect"
import { addToWishList } from "@store/thunk/cart";
import {useSelector,useDispatch} from "react-redux"

const Clarinettes = () => {
  const dispatch = useDispatch();
  const [filterToggleState, setFilterToggleState] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);


  const ColComp = ({
    elTitle,
    elSubTitle,
    elText,
    discPercentage,
    newPrice,
    oldPrice,
    countPrice,
    productId
  }) => {
    const wishList = useSelector(state => state.cart.wishList)

    const addProductWishList = async (productId) => {
      dispatch(addToWishList(productId))
    }

    return( <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex justify-content-between">
      <div className="clarinettes_filter_result_image_card d-flex">
        <div className="clarinettes_filter_image d-flex align-items-center">
          <img src="/assets/calque_118.png" alt=" " />
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center ms-2 ms-sm-4">
          <div className="clarinettes_filter_main_heading jost_font text-dark text-uppercase">
            {elTitle}
          </div>
          <div className="clarinettes_filter_featured_text_one jost_font text-dark text-uppercase">
            {elSubTitle}
          </div>
          <div className="clarinettes_filter_featured_text_two jost_font text-dark">
            {elText}
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
            }            <FaCartPlus />
          </div>
        </div>
      </div>
    </div>
  )};

  const RowComp = ({
    elTitle,
    elSubTitle,
    elText,
    discPercentage,
    newPrice,
    countPrice,

  }) => (
    <div className="clarinettes_filter_result_card cursor-pointer mb-3 d-flex flex-column col-6 col-sm-4 col-md-3 px-1 px-sm-3 pb-3">
      <div className="clarinettes_filter_result_image_card d-flex flex-column">
        <div className="clarinettes_filter_image d-flex mb-3 position-relative">
          <div className="plus_container position-absolute fw-bold text-center">
            <BsPlusLg />
          </div>
          <img src="/assets/calque_118.png" alt=" " />
          {discPercentage ? (
            <div className="prod_dicount_row_card jost_font d-flex align-items-center justify-content-center">
              -{discPercentage}
            </div>
          ) : null}
        </div>
        <div className="clarinettes_filter_image_content d-flex flex-column justify-content-center">
          <div className="clarinettes_filter_main_heading jost_font text-dark text-uppercase">
            {elTitle}
          </div>
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
          <BsHeart className="mb-2" />
          <FaCartPlus />
        </div>
      </div>
    </div>
  );

  const CardContainers = ({ ctxtOne, txtTwo, imgName }) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3 pe-sm-3">
      <div className="sub_category_container">
        <Link passHref href={"/products/" + ctxtOne}>
          <a className="text-decoration-none">
            <div className="d-flex align-items-center justify-content-between h-100">
              <img src={`/assets/${imgName}`} width={150} alt="" className="h-100" />
              <div className="card_content_container h-100 w-100">
                <div className="d-flex align-items-center h-100">
                  <CardTextComponent
                    cardClass="align-items-end ms-3 me-2 card_content_container-text"
                    ctxtOne={ctxtOne}
                    txtTwo={txtTwo}
                  />
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );


  return (
    <div className="clarinettes__container container my-3 my-sm-5">
      <Breadcrumb>
        <BreadcrumbItem ><BreadcrumbSelect /></BreadcrumbItem>
        <BreadcrumbItem ><BreadcrumbSelect /></BreadcrumbItem>
        <BreadcrumbItem isLast>CLARINETTES</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12 d-flex flex-wrap mb-5">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4 text-uppercase">occasions clarinettes</div>
            <div className="image_sub_heading text-uppercase">
              occasions  INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 ps-0 ps-lg-3 mt-5 mt-lg-0">
          <ContactusCard ContactusCardHeight="h-100" />
        </div>
      </div>

      <div className="col-12 mt-5 d-flex flex-wrap">
        <CardContainers
          ctxtOne="clarinettes"
          txtTwo="sib"
          imgName="calque_122.png"
        />
        <CardContainers
          ctxtOne="clarinettes"
          txtTwo="LA"
          imgName="calque_124.png"
        />
        <CardContainers
          ctxtOne="clarinettes"
          txtTwo="UT"
          imgName="calque_125.png"
        />
        <CardContainers
          ctxtOne="clarinettes"
          txtTwo="mib re"
          imgName="calque_126.png"
        />
        <CardContainers
          ctxtOne="clarinettes basses"
          txtTwo="CONTREBASSES"
          imgName="calque_127.png"
        />

        <CardContainers
          ctxtOne="CLARINETTES"
          txtTwo={`ALTOS CONTRALTOS`}
          imgName="calque_128.png"
        />

        <CardContainers
          ctxtOne="CLARINETTES"
          txtTwo="la de basset"
          imgName="calque_123.png"
        />
        <CardContainers
          ctxtOne="cors de"
          txtTwo="basset"
          imgName="calque_129.png"
        />
      </div>

      <div className="col-12 my-3 my-sm-5 mt-4 m-0 row partition_main_container">
        {showFilterSidebar ? (
          <div className="position-fixed filter_sidebar_hide h-100 d-block p-0 d-lg-none">
            <div className="partition_grey_container p-4">
              <div className="heading_with_filter_icon d-flex align-items-center">
                <FaFilter className="text-dark me-3" />
                <div className="partition_grey_container_heading text-uppercase me-auto">
                  FILTRES
                </div>
                <IoMdClose
                  style={{
                    color: " #000",
                    transform: "translate(16px, -16px)",
                    fontSize: "27px ",
                  }}
                  className="cursor-pointer d-block d-md-none"
                  onClick={() => setShowFilterSidebar((prev) => !prev)}
                />
              </div>
              <button className="partition_btn_class text-light w-100 d-flex text-uppercase align-items-center justify-content-between my-5">
                <RiDeleteBin6Line style={{ fontSize: "20px" }} />
                supprimer la sélection
              </button>
              <div className="partition_grey_container_heading text-uppercase my-4 ">
                instruments
              </div>

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
              <div className="partition_grey_container_heading text-uppercase my-4">
                offre produit
              </div>

              <CheckboxComp checkTxt="Soldes (11)" />
              <CheckboxComp checkTxt="Vente Flash (8)" />
              <div className="partition_grey_container_heading text-uppercase my-4">
                + filter arpéges 1
              </div>
              <div className="partition_grey_container_heading text-uppercase my-4">
                + filter arpéges 2
              </div>
              <div className="partition_grey_container_heading text-uppercase my-4">
                + filter arpéges 3
              </div>
            </div>
          </div>
        ) : null}
        <div className="d-none d-lg-block col-lg-3">
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
            <div className="partition_grey_container_heading text-uppercase">
              compositeur
            </div>
            <input
              type="text"
              className="partition_input_container w-100 px-3 py-2 my-3"
              placeholder="Je saisis un compositeur"
            />
            <div className="partition_grey_container_heading text-uppercase my-4 ">
              instruments
            </div>

            <CheckboxComp checkTxt="Accordéon (5)" />
            <CheckboxComp checkTxt="Accordéons (8)" />
            <CheckboxComp checkTxt="Alto (12)" />
            <CheckboxComp checkTxt="Bandoneon (6)" />
            <CheckboxComp checkTxt="Instrument 5 (8)" />
            <div className="partition_grey_container_heading text-uppercase my-4 ">
              style
            </div>

            <CheckboxComp checkTxt="Classique (5)" />
            <CheckboxComp checkTxt="Contemporain (8)" />
            <CheckboxComp checkTxt="Style 3 (12)" />
            <CheckboxComp checkTxt="Style 4 (157)" />
            <div className="partition_grey_container_heading text-uppercase my-4 ">
              format
            </div>
            <CheckboxComp checkTxt="Papier (5)" />
            <CheckboxComp checkTxt="Numérique (8)" />
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

        <div className="clarinettes_filter_result_container row col-12 col-lg-9">
          <div className="clarinettes_filter_result_count_card mb-3 mb-sm-5 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <div className="clarinettes_filter_result_left_side d-flex">
              <RiMenuUnfoldLine
                onClick={() => setShowFilterSidebar((prev) => !prev)}
                style={{ fontSize: "22px" }}
                className="theme_primary_color me-2 cursor-pointer d-block d-lg-none"
              />
              <div className="clarinettes_filter_result_count theme_primary_color me-2">
                42
              </div>
              <div className="clarinettes_filter_result_text text-dark">
                RÉSULTATS
              </div>
            </div>
            <div className="clarinettes_filter_result_right_side d-flex align-items-center">
              <BsFilterRight
                className="text-dark me-2 mb-3 mb-sm-0"
                style={{ transform: "rotate(180deg)", fontSize: "20px" }}
              />
              <div className="jost_font clarinettes_filter_button_text text-dark text-uppercase mb-3 mb-sm-0">
                trier:
              </div>
              <AntSelectDropDown />
              <FaListUl
                className={`text-dark ms-3 cursor-pointer ${filterToggleState ? "theme_primary_color" : null
                  } mb-3 mb-sm-0`}
                onClick={() => setFilterToggleState((prevState) => !prevState)}
                style={{ fontSize: "20px" }}
              />
            </div>
          </div>
          {!filterToggleState ? (
            <div className="d-flex flex-column">
              <ColComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                discPercentage="20%"
                newPrice="716,00€ TTC"
                oldPrice="102.50€ TTC"
                countPrice="6 X 119,33€"
              />
              <ColComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                oldPrice="102.50€ TTC"
                countPrice="6 X 119,33€"
              />
              <ColComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                oldPrice="102.50€ TTC"
                countPrice="6 X 119,33€"
              />
              <ColComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                discPercentage="20%"
                newPrice="716,00€ TTC"
                oldPrice="102.50€ TTC"
                countPrice="6 X 119,33€"
              />
            </div>
          ) : null}
          {filterToggleState ? (
            <div className="col-12 d-flex flex-wrap">
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                discPercentage="20%"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                discPercentage="20%"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
              <RowComp
                elTitle="YAMAHA"
                elSubTitle="YCL 250SUK"
                elText="Clarinette SIB"
                newPrice="716,00€ TTC"
                countPrice="6 X 119,33€"
              />
            </div>
          ) : null}

          <div className="clarinettes_filter_result_card mb-3 d-flex justify-content-between"></div>
        </div>
      </div>

      <SliderSlickTwo slidesToShowNum={6} />
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div>
    </div>
  );
};

export default Clarinettes;
