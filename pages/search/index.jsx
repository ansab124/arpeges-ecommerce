import React, { useState } from "react";

import { BsPlusLg, BsHeart } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { IoIosBackspace } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AntSelectDropDown } from "../../components/controls/AntSelectDropDown";

const Search = ({ isHideContent = false, fourth_section_className = "" }) => {
  const [isActiveNum, setIsActiveNum] = useState(1);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [formData, setFormData] = useState("");
  const handleChange = (num) => {
    setIsActiveNum(num);
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 3000);
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
    imgNum,
    mainHeading,
    subHeading,
    textContent,
    newPrice,
    oldPrice,
    calcPrice,
  }) => (
    <div
      className={`search_section_container ${fourth_section_className} d-flex col-12 col-sm-4 col-lg-3 col-xl-2 flex-column pe-3 pe-lg-0`}
    >
      <div className="search_section_container-image_container position-relative px-3 w-100 d-flex justify-content-center align-items-center">
        <div className="plus_container position-absolute fw-bold text-center">
          <BsPlusLg />
        </div>

        <img
          src={`/assets/fourthSectionImages/calque_${imgNum}.svg`}
          className="w-auto"
          alt=""
        />
      </div>

      
      <div className="search_section_container-content_section d-flex flex-column">
        <div className="content_heading text-dark text-uppercase">
          {mainHeading}
        </div>
        <div className="content_sub_heading text-dark">{subHeading}</div>
        <div className="content_desc text-dark">{textContent}</div>

        <div className="content_container mt-3 d-flex justify-content-between">
          <div className="price_container">
            <div className="content_price_sec_new">{newPrice}</div>
            {oldPrice ? (
              <div className="content_price_sec_old my-2">{oldPrice}</div>
            ) : (
              ""
            )}
            <div className="d-flex mt-2">
              <div className="black_content text-dark text-uppercase">ou</div>
              <div className="blue_content text-uppercase ms-1">
                6 x 119,33€
              </div>
            </div>
          </div>
          <div className="cart_container d-flex flex-column justify-content-center">
            <BsHeart className="mb-2" />
            <FaCartPlus />
          </div>
        </div>
      </div>
    </div>
  );
  const a = ["hamza", "Zulqarnain", "Awais"];

  const sortedName = a.sort();

  const handleChanges = (e) => {
    // removeElements();
    // const myInputField = e.target.value;
    // for (let i of sortedName) {
    //   if (
    //     i.toLowerCase().startsWith(myInputField.toLowerCase()) &&
    //     myInputField !== ""
    //   ) {
    //     let listItem = document.createElement("div");
    //     listItem.classList.add("list-items");
    //     listItem.setAttribute("onclick", displayNames(i));
    //     let word = "<b>" + i.substr(0, myInputField.length) + "</b>";
    //     word += i.substr(myInputField.length);
    //     console.log(word, "wordwordword");
    //     listItem.innerHTML = word;
    //     document.querySelector(".input_result_container").appendChild(listItem);
    //   }
    // }
  };
  function displayNames(value) {
    setFormData(value);
    removeElements();
  }
  function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((el) => {
      el.remove();
    });
  }

  const SearchCardComp = ({ mainheading, subHeading }) => (
    <div className="search_response_card_container d-flex w-100 mb-3">
      <div className="white_response_container bg-light h-100 d-flex align-items-center px-3">
        <img src="/assets/noun-music-1187.png" alt="" />
      </div>
      <div className="content_container d-flex flex-column justify-content-center ps-3">
        <div className="main_search_heading jost_font text-uppercase text-light">
          {mainheading}
        </div>
        <div className="main_search_sub_heading jost_font">{subHeading}</div>
      </div>
      <AiOutlineRight style={{ fontSize: "25px" }} className="mt-auto" />
    </div>
  );

  return (
    <div className="search__container">
      <div className="black_box_container">
        <div className="navbara">
          <div className="dropdown">
            <div className="input__container dropdown dropbtn py-3 flex-column d-flex justify-content-center align-items-center">
              <div className="mb-3 w-100 w-lg-auto d-flex justify-content-center align-items-center">
                <input
                  type="text"
                  id="input"
                  defaultValue={formData}
                  onKeyUp={(e) => handleChanges(e)}
                  className="border-0 text-light text-uppercase jost_font px-2 px-sm-4"
                  placeholder="guitare"
                />
                <IoIosBackspace
                  style={{ fontSize: "25px", transform: "translateX(-36px)" }}
                />
                <RiDeleteBin6Line
                  onClick={removeElements}
                  style={{ fontSize: "25px", transform: "translateX(-15px)" }}
                />
              </div>
              <div className="dropdown-content">
                <div className="rowa col-12 d-flex flex-wrap m-0 py-3">
                  <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column mb-3">
                    <div className="suggested__text_container d-flex align-items-center mb-1">
                      <ImSearch />
                      <div className="suggested__text ms-2 text-uppercase">
                        guitare
                      </div>
                    </div>
                    <div className="suggested__text_container d-flex align-items-center mb-1">
                      <ImSearch />
                      <div className="suggested__text ms-2 text-uppercase">
                        guitare
                      </div>
                    </div>
                    <div className="suggested__text_container d-flex align-items-center mb-1">
                      <ImSearch />
                      <div className="suggested__text ms-2 text-uppercase">
                        guitare
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column px-1">
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column px-1">
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column px-1">
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                    <SearchCardComp
                      mainheading="accordeons electroniques"
                      subHeading="Guitare"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fourth_section_container container">
        <div className="tab_container h-auto justify-content-between flex-column flex-lg-row align-items-center d-none d-md-flex">
          <div className="heading_container position-relative text-uppercase text-dark mt-4">
            <img src="/assets/calque_64.svg" alt="" />
            <div className="heading_text ms-5 w-100 d-flex ">
              <span className="theme_primary_color fw-bold me-2">xxxx</span>
              produits
            </div>
          </div>
          <div className="btn__tabs_container d-flex mt-4">
            <button
              onClick={() => handleChange(1)}
              className={`${isActiveNum === 1 ? "btn__container_active" : ""
                } btn__container d-flex justify-content-center mx-1 px-3 align-items-center text-uppercase w-auto`}
            >
              MARQUE
            </button>
            <button
              onClick={() => handleChange(2)}
              className={`${isActiveNum === 2 ? "btn__container_active" : ""
                } btn__container d-flex justify-content-center mx-1 px-3 align-items-center text-uppercase w-auto`}
            >
              DISPONIBILITé
            </button>
            <button
              onClick={() => handleChange(3)}
              className={`${isActiveNum === 3 ? "btn__container_active" : ""
                } btn__container d-flex justify-content-center mx-1 px-3 align-items-center text-uppercase w-auto`}
            >
              offre produit
            </button>
            <button
              onClick={() => handleChange(4)}
              className={`${isActiveNum === 4 ? "btn__container_active" : ""
                } btn__container d-flex justify-content-center mx-1 px-3 align-items-center text-uppercase w-auto`}
            >
              prix
            </button>
          </div>
        </div>

        <div className="d-flex align-items-end mb-3 w-100 d-block d-md-none mt-3 justify-content-center">
          <AntSelectDropDown isAllowClear={false} placeholder="MARQUE" />

          {/* <Select
              placeholder="MARQUE"
              onChange={handleCHangeTwo}
              defaultValue="1"
            >
              <Option className="text-uppercase" value="1">
                MARQUE
              </Option>
              <Option className="text-uppercase" value="2">
                DISPONIBILITé
              </Option>
              <Option className="text-uppercase" value="3">
                offre produit
              </Option>
              <Option className="text-uppercase" value="4">
                prix
              </Option>
            </Select> */}

        </div>
        <div className="pb-5 row m-0 col-12 itemsResult">
          <CarouselComp
            imgNum={80}
            mainHeading="YAMAHA"
            subHeading="SIB YAMAHA YTR 2330"
            textContent="Trompette sib"
            newPrice="389,00€ TTC"
          />
          <CarouselComp
            imgNum={77}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={78}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={81}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={84}
            mainHeading="YAMAHA"
            subHeading="SIB YAMAHA YTR 2330"
            textContent="Trompette sib"
            newPrice="389,00€ TTC"
          />
          <CarouselComp
            imgNum={78}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={80}
            mainHeading="YAMAHA"
            subHeading="SIB YAMAHA YTR 2330"
            textContent="Trompette sib"
            newPrice="389,00€ TTC"
          />
          <CarouselComp
            imgNum={77}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={78}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={81}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
          <CarouselComp
            imgNum={84}
            mainHeading="YAMAHA"
            subHeading="SIB YAMAHA YTR 2330"
            textContent="Trompette sib"
            newPrice="389,00€ TTC"
          />
          <CarouselComp
            imgNum={78}
            mainHeading="FENDER"
            subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
            textContent="Guitares électriques"
            newPrice="716,00€ TTC"
            oldPrice="102.50€ TTC"
          />
        </div>

        {/* <CarouselComp
        imgNum={83}
        mainHeading="FENDER"
        subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
        textContent="Guitares électriques"
        newPrice="716,00€ TTC"
        oldPrice="102.50€ TTC"
      />
      <CarouselComp
        imgNum={77}
        mainHeading="FENDER"
        subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
        textContent="Guitares électriques"
        newPrice="716,00€ TTC"
        oldPrice="102.50€ TTC"
      />
      <CarouselComp
        imgNum={80}
        mainHeading="YAMAHA"
        subHeading="SIB YAMAHA YTR 2330"
        textContent="Trompette sib"
        newPrice="389,00€ TTC"
      />
      <CarouselComp
        imgNum={81}
        mainHeading="FENDER"
        subHeading="CLASSIC SERIES 50'S STRATOCASTER MAPLE"
        textContent="Guitares électriques"
        newPrice="716,00€ TTC"
        oldPrice="102.50€ TTC"
      />
      <CarouselComp
        imgNum={84}
        mainHeading="YAMAHA"
        subHeading="SIB YAMAHA YTR 2330"
        textContent="Trompette sib"
        newPrice="389,00€ TTC"
      /> */}
      </div>
    </div>
  );
};

export default Search;
