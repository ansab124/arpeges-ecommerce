import React from "react";
import dynamic from "next/dynamic";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from "react-slick";
import Image from "next/image";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const IMAGES = [
  "/assets/productImages/v1.png",
  "/assets/productImages/v2.png",
  "/assets/productImages/v3.png",
  "/assets/productImages/v1.png",
  "/assets/productImages/v2.png",
  "/assets/productImages/v3.png",
];

const VideoSection = ({ videos }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: videos?.length > 2 ? 3 : 2,
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
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
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
  return (
    <div className="video_section">
      <div className="container ">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div>
              <ReactPlayer
                className="react-player"
                url={(videos?.length > 0 && videos[0].video) || ""}
                width="100%"
                height="450px"
              />
            </div>
            <div className="w-100 mt-3 slick__small_carousel">
              {videos && videos.length > 0 && (
                <Slider {...settings}>
                  {videos?.map((image, index) => {
                    return (
                      <div key={image + index}>
                        <img
                          key={image}
                          height={140}
                          width={140}
                          src={image?.img}
                          alt={image}
                        />
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
