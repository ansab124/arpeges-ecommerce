import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const IMAGES = [
  "/assets/productImages/1.png",
  "/assets/productImages/2.png",
  "/assets/productImages/3.png",
  "/assets/productImages/1.png",
  "/assets/productImages/2.png",
  "/assets/productImages/3.png",
];

const ProductSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    nextArrow: <TiArrowSortedDown />,
    prevArrow: <TiArrowSortedUp />,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      setCurrentImage(currentSlide);
    },
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="product_slider">
      <div style={{ height: "450px" }}>
        <Slider {...settings}>
          {images?.map((image, index) => {
            return (
              <div key={image + index}>
                <Image
                  key={image}
                  height={140}
                  width={140}
                  src={image}
                  alt={image}
                  objectFit="cover"
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="product_slider-image">
        {images && images?.length > 0 && (
          <Image
            width={340}
            height={450}
            src={images[currentImage]}
            alt={images[currentImage]}
            objectFit="cover"
          />
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
