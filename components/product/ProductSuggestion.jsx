import React, { useRef } from "react";
import { ColComp } from "../partiton/VerticleCard";
import Slider from "react-slick";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VerticleInstrumentCard } from "../instruments/VerticleCard";
import { GrNext, GrPrevious } from "react-icons/gr";

const ProductSuggestion = ({ title, subTitle, isPartition, products }) => {
  const sliderRef = useRef();
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="product_suggestion row">
      <div className="col-12 col-md-3 col-lg-3 col-xl-3">
        <h4>{title}</h4>
        {subTitle && <h5 className="mt-5">{subTitle}</h5>}
      </div>
      <div className="col-12 col-md-9 col-lg-9 col-xl-9 d-flex prod_container ">
        <button className="backward-arrow d-none d-lg-block">
          <SlArrowLeft
            onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
            size={28}
          />
        </button>
        <div className="w-100 mt-3 ">
          <Slider ref={sliderRef} {...settings}>
            {products &&
              products?.length > 0 &&
              products?.map((product, index) => {
                return !isPartition ? (
                  <ColComp
                    productId={product?.id || product.product_id}
                    key={product?.title + index}
                    rowTitle={product?.title}
                    rowSubTitle={product?.instrument}
                    italicTextBlack={product?.composer}
                    italicTextGrey={product?.cottage}
                    newPrice={`${product?.price} TTC`}
                    showDropDown={false}
                    image={product?.image}
                    formats={product?.formats}
                    discPercentage={product?.discount}
                    slug={product?.slug}
                  />
                ) : (
                  <VerticleInstrumentCard
                    elTitle={product?.title}
                    elSubTitle={product?.brand}
                    elText={product?.category}
                    // discPercentage="20%"
                    newPrice={`${product?.price} TTC`}
                    productId={product?.id || product.product_id}
                    //   countPrice="6 X 119,33€"
                    image={product?.image}
                    // discPercentage={product?.discount}
                    slug={product?.slug}
                  />
                );
              })}
          </Slider>
        </div>
        <button className="forward-arrow d-none d-lg-block">
          <SlArrowRight
            size={28}
            onClick={() => sliderRef.current && sliderRef.current.slickNext()}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductSuggestion;
