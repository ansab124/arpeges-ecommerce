import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { getBrandsSliderList } from "@actions";
export const SliderSlickTwo = ({ slidesToShowNum = 8 }) => {
  const [slides, setSlides] = useState([]);

  const getSlides = async () => {
    const response = await getBrandsSliderList();
    setSlides(response?.data || []);
  };

  useEffect(() => {
    getSlides();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slides?.length > 8 ? slidesToShowNum : slides?.length,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    cssEase: "linear",
    nextArrow: <IoIosArrowForward />,
    prevArrow: <IoIosArrowBack />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  const ImageComp = ({ image }) => (
    <div className="slick_part position-relative d-flex justify-content-center align-items-center">
      <div className="plus_container position-absolute fw-bold text-center">
        <BsPlusLg />
      </div>
      <img src={image} alt="brands images" />
    </div>
  );
  return (
    <div className="w-100 mt-5 slick__small_carousel">
      <Slider {...settings}>
        {slides &&
          slides.map((slide, index) => {
            return (
              <ImageComp image={slide?.image} key={slide?.brand + index} />
            );
          })}
      </Slider>
    </div>
  );
};
