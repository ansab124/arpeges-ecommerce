import React from "react";
import { FaMusic } from "react-icons/fa";

export const FifthSection = () => {
  const h4_tag = "<h4>";
  return (
    <div data-aos={"zoom-in"}className="fifth_section_container container pt-5 pt-sm-5">
      <div className="d-flex flex-row align-items-baseline flex-sm-column">
        <div className="fifth_section_container-colored_container"></div>
        <div className="main_heading_container text-uppercase text-dark mt-0 mt-sm-5 mb-sm-3 mb-0">
          {`VENTE ET LOCATION D'INSTRUMENTS DE MUSIQUE | PARIS - ARRAS`}
        </div>
      </div>
      <div className="content_container mt-5 w-100 d-flex flex-column">
        <div className="colored_main_container">
          <div className="colored_container_map h-100 d-flex flex-column align-items-center">
            <div className="white_text white_text_container d-flex d-none d-sm-block flex-column align-items-center">
              <div className="d-flex align-items-center mb-2">
                <div className="white_dot"></div>
                <div className="ms-2 white_text text-uppercase fw-bold text-light">
                  arras
                </div>
              </div>
              <div className="d-flex ms-5 mt-4 align-items-center">
                <div className="white_dot"></div>
                <div className="ms-2 white_text text-uppercase fw-bold text-light">
                  paris
                </div>
              </div>
            </div>
            <div className="heading_text text-uppercase text-dark mt-3 pt-5">
              VENTE EN BOUTIQUE
            </div>
            <div className="sub_heading_text text-uppercase mt-4 text-dark">
              INSTRUMENTS, ACCESSOIRES & PARTITIONS {h4_tag}
            </div>
            <div className="white_text white_text_container mt-4 mt-sm-0 d-flex-column align-items-center d-block d-sm-none">
              <div className="d-flex align-items-center mb-2">
                <div className="white_dot"></div>
                <div className="ms-2 white_text text-uppercase fw-bold text-light">
                  arras
                </div>
              </div>
              <div className="d-flex ms-5 mt-4 align-items-center">
                <div className="white_dot"></div>
                <div className="ms-2 white_text text-uppercase fw-bold text-light">
                  paris
                </div>
              </div>
            </div>
            <p className="mt-3 mt-sm-5 text-center">
              Praesent volutpat ut nisl inlit hendrerit. Vestibulum antem ipsum
              isul primis in
            </p>
            <p className="mt-2 text-center">
              faucibus orci luctus et ultrices posible uere cubilia Curaemil mil
              Etiam porttitor, lacus in luctus mun.
            </p>
            <div className="bottom_heading_text text-uppercase mt-5 pt-3 d-flex align-items-center text-dark text-center">
              voir les boutiques arpèges
            </div>
          </div>
        </div>

        <div className="image_section_container d-flex justify-content-between flex-column flex-md-row align-items-center">
          <div className="card_container_one position-relative mt-5 mt-md-0">
            <img
              src="/assets/fifthSectionImages/calque_74.svg"
              className=""
              alt=""
            />
            <div className="text_container text-uppercase ms-4 text-light fw-bold position-absolute">
              <img
                src="/assets/fifthSectionImages/setting.svg"
                className="mb-2 me-2"
                alt=""
              />
              atelier
              <br />
              réparation
            </div>
          </div>
          <div className="card_container_two position-relative mt-5 mt-md-0">
            <img src="/assets/fifthSectionImages/calque_14.svg" alt="" />
            <div className="text_container text-uppercase ms-4 text-light fw-bold position-absolute">
              <FaMusic /> location
              <br />
              instruments
            </div>
          </div>

          <div className="card_container_three position-relative my-5 my-md-0"></div>
        </div>
      </div>
    </div>
  );
};
