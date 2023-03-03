import React from "react";
import { HiMailOpen } from "react-icons/hi";

export const ContactusCard = ({ ContactusCardHeight = "h-auto" }) => {
  return (
    <div className={`contactus_container ${ContactusCardHeight} w-100 p-4`}>
      <div className="contactus_container-heading_container d-flex justify-content-between align-items-center">
        <HiMailOpen className="text-dark" style={{ fontSize: "25px" }} />
        <div className="contactus_container-main_heading text-dark ms-4 text-uppercase">
          {` BESOIN d'un renseignement ?`}
        </div>
      </div>

      <div className="contactus_container-sub_heading_container pt-3 ps-2">
        <div className="contactus_container-sub_main_heading jost_font text-uppercase theme_primary_color">
          contact
        </div>
        <div className="contactus_container-sub_main_heading jost_font text-uppercase theme_primary_color">
          sav
        </div>
        <div className="contactus_container-sub_main_heading jost_font text-uppercase theme_primary_color">
          réparation
        </div>
        <div className="contactus_container-sub_main_heading jost_font text-uppercase theme_primary_color">
          location
        </div>
        <div className="contactus_container-sub_main_heading jost_font text-uppercase theme_primary_color">
          assurance
        </div>

        <div className="address_heading text-uppercase text-dark pt-3 jost_font">
          ARPÈGES
        </div>
        <div className="d-flex flex-column" >
          <span className="address_sub_heading text-uppercase  text-dark jost_font">PARIS : +33 (0)1 53 06 39 40</span>
          <span className="address_sub_heading text-uppercase  text-dark jost_font">ARRAS : +33 (0)3 21 55 65 79</span>
        </div>

      </div>
    </div>
  );
};
