import React, { useState } from "react";
import Slider from "react-slick";
import { BiRightArrow } from "react-icons/bi";
import Stories from "../components/stories"
import Image from "next/image";
export const SliderSlick = () => {
  const [openModel, setOpenModel] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    swipeToSlide: true,
    cssEase: "linear",

    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
        className="container text-light"
      >
        <ul
          style={{ margin: "0px" }}
          className="d-flex justify-content-center flex-row flex-sm-column align-items-end align-items-sm-center"
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <>
        <div onClick={() => setOpenModel(true)} className="mb-1">
          <img
            src={`/assets/carousalImages/carousalImg3.jpg`}
            className={`${i === 0 ? "nav_image_icon" : ""}`}
            alt={`images-${i}`}

            height={70}
            width={70}
          />
          <BiRightArrow className="text-light" />
        </div>
        <div className="carousal_text text-light d-flex justify-content-center">
          <div className="active_slick_container me-2"></div>
          <div>
            {i + 1 === 1
              ? "Promo rentrée"
              : i + 1 === 2
                ? "Fête de la musique"
                : "BACH pour débutant"}
          </div>
        </div>
      </>
    ),
  };

  const ContainerComponent = () => (
    <div className="container">
      <div className="d-flex carousal_height justify-content-center flex-column w-100">
        <div className="carousal_txt_heading d-flex justify-content-sm-start justify-content-center text-uppercase text-light mb-4">
          promo spéciale
        </div>
        <div className="carousal_txt_heading d-flex justify-content-sm-start justify-content-center text-uppercase text-light">
          rentrée
        </div>
      </div>
      <div className="carousel_para carousal_height">
        {` Bénéficiez d'une remise panier de -15% pour l'achat d'une guitare`}
        <br />
        HARLEY BENTON.
      </div>
      <button className="carousel__button carousal_height text-light text-uppercase d-flex justify-content-center flex-column align-items-center">
        {` j'en profite`}
      </button>
    </div>
  );
  return (
    <div className="W-100 bg-dark slick_container">
      <Slider {...settings}>
        <div className="carousal_first_container d-flex flex-column justify-content-center height_width_carousel">
          <ContainerComponent />
        </div>
        <div className="carousal_first_container height_width_carousel d-flex flex-column justify-content-center">
          <ContainerComponent />
        </div>
        <div className="carousal_first_container height_width_carousel d-flex flex-column justify-content-center">
          <ContainerComponent />
        </div>
      </Slider>
      {openModel && <Stories open={openModel} setOpen={setOpenModel} />}
    </div>
  );
};
