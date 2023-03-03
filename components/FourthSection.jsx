import React, { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsPlusLg, BsHeart,BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { AntSelectDropDown } from "./controls/AntSelectDropDown";
import Image from "next/image";
import { useDispatch ,useSelector} from "react-redux";
import { addProductToCart,addToWishList } from "@store/thunk/cart";
// import { addProductToWishList } from "@actions";
import Link from "next/link";
export const FourthSection = ({
  isHideContent = false,
  fourth_section_className = "",
  related = {},
  sellingProducts = [],
}) => {
const wishList = useSelector(state=>state.cart.wishList)
  const [isActiveNum, setIsActiveNum] = useState(1);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [products, setProducts] = useState(related?.offer);
  const handleChange = (num) => {
    setIsActiveNum(num);
    setLoadingSkeleton(true);
  };
  const handleCHangeTwo = (btnNum) => {
    const btnNumVar = Number(btnNum);
    setIsActiveNum(btnNumVar);
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 3000);
  };
  const CarouselComp = ({
    mainHeading,
    subHeading,
    textContent,
    newPrice,
    oldPrice,
    image,
    productId,
    slug
  }) => {
    const dispatch = useDispatch();

    const addProductWishList=async(productId)=>{
      dispatch(addToWishList(productId))
    }
    
    const addToCart = (productId) => {
      let object = {
        product_id: productId,
        quantity: 1,
        type: 1,
      };
      dispatch(addProductToCart(object));
    };

    return (
      <div
        className={`fourth_section_slick_container ${fourth_section_className} d-flex flex-column pe-3 pe-lg-0`}
      >
        <div className="fourth_section_slick_container-image_container position-relative px-3 w-100 d-flex justify-content-center align-items-center">
          <div className="plus_container position-absolute fw-bold text-center">
            <BsPlusLg />
          </div>
          <Image height={250} width={150} src={image} alt={subHeading} />
        </div>
        <div className="fourth_section_slick_container-content_section d-flex flex-column">
          <Link href={`/products/${slug}`} passHref>
          <a className="content_heading text-dark text-uppercase">
            {mainHeading} 
          </a>
          </Link>
          <div className="content_sub_heading text-dark">{subHeading}</div>
          <div className="content_desc text-dark">{textContent}</div>

          <div className="content_container mt-3 d-flex align-items-start justify-content-between">
            <div>
              <div className="price_container">
                <div className="content_price_sec_new">{newPrice}</div>
                {oldPrice ? (
                  <div className="content_price_sec_old my-2">{oldPrice}</div>
                ) : (
                  ""
                )}
                <div className="d-flex mt-2">
                  <div className="black_content text-dark text-uppercase">
                    ou
                  </div>
                  <div className="blue_content text-uppercase ms-1">
                    6 x 119,33€
                  </div>
                </div>
              </div>
            </div>
            <div className="cart_container d-flex flex-column justify-content-start gap-3 mt-2">
              {
                wishList.includes(productId)?<BsHeartFill size={18}  className="cursor-pointer" onClick={()=>addProductWishList(productId)} />:
                <BsHeart size={18}  className="cursor-pointer" onClick={()=>addProductWishList(productId)} />
              }
              
              <FaCartPlus
                className="cursor-pointer"
                size={18}
                onClick={() => {
                  addToCart(productId);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesToShow: products?.length > 4 ? 4 : products?.length,
    swipeToSlide: true,
    cssEase: "linear",
    nextArrow: <IoIosArrowForward className="text-dark" />,
    prevArrow: <IoIosArrowBack className="text-dark" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  const SkeletonComp = () => (
    <div className="d-flex">
      <div className="w-50 w-sm-25 px-3 d-none d-sm-inline-block">
        <Skeleton circle={true} height={100} width={100} className="mb-3" />
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
      </div>
    </div>
  );
  return (
    <div className="fourth_section_container container mt-0 mt-sm-5">
      <div className="tab_container justify-content-between flex-row align-items-center d-none d-md-flex">
        <div className="heading_container position-relative text-uppercase text-dark">
          <img src="/assets/calque_64.svg" alt="" />
          <div className="heading_text ms-5 w-100">bons plans</div>
        </div>
        <div className="btn__tabs_container d-flex">
          <button
            onClick={() => {
              setProducts(related?.offer);
              handleChange(1);
              setLoadingSkeleton(false);
            }}
            className={`${isActiveNum === 1 ? "btn__container_active" : ""
              } btn__container d-flex justify-content-center mx-1 align-items-center text-uppercase`}
          >
            promotions
          </button>
          <button
            onClick={() => {
              setProducts(related?.new);
              handleChange(2);
              setLoadingSkeleton(false);
            }}
            className={`${isActiveNum === 2 ? "btn__container_active" : ""
              } btn__container d-flex justify-content-center mx-1 align-items-center text-uppercase`}
          >
            nouveautés
          </button>
          <button
            onClick={() => {
              setProducts(related?.old);
              handleChange(3);
              setLoadingSkeleton(false);
            }}
            className={`${isActiveNum === 3 ? "btn__container_active" : ""
              } btn__container d-flex justify-content-center mx-1 align-items-center text-uppercase`}
          >
            occasions
          </button>
        </div>
      </div>

      <div className="d-flex align-items-end mb-3 w-100 d-block d-md-none">
        <AntSelectDropDown placeholder={"promotions"} />
      </div>
      <div className="pb-5">
        {loadingSkeleton ? (
          <SkeletonComp />
        ) : (
          <Slider {...settings}>
            {products &&
              products?.map((product, index) => {
                return (
                  <CarouselComp
                    key={product?.brand + index}
                    mainHeading={product?.brand}
                    subHeading={product?.title}
                    textContent={product?.category}
                    newPrice={`${product?.price} TTC`}
                    image={product?.image}
                    productId={product?.id || product?.product_id}
                    slug={product?.slug}
                    

                  />
                );
              })}
          </Slider>
        )}
      </div>

      {!isHideContent ? (
        <>
          <div className="heading_main_text mt-5 mb-3">
            {!loadingSkeleton ? (
              "MEILLEURES VENTES <h3>"
            ) : (
              <Skeleton className="mb-2" />
            )}
          </div>
          <hr />
        </>
      ) : null}
      {!isHideContent ? (
        <div className="py-5">
          {loadingSkeleton ? (
            <SkeletonComp />
          ) : (
            <Slider {...settings}>
              {sellingProducts?.map((item, index) => {
                return (
                  <CarouselComp
                    key={item?.brand + index}
                    mainHeading={item?.brand}
                    subHeading={item?.title}
                    textContent={item?.category}
                    newPrice={`${item?.price} TTC`}
                    image={item?.image}
                    productId={item?.id || item?.product_id}
                    slug={item?.slug}
                  />
                );
              })}
            </Slider>
          )}
        </div>
      ) : null}
    </div>
  );
};
