import React from "react";
import { AccordeonSection } from "./AccordeonSection";



export const SecondSection = () => {
  const h2_tag = "<h2>";
  const h4_tag = "<h4>";

  return (
    <div className="second__section_container mt-3 mb-5 pb-0 pb-sm-5">
      <div className="second__section_container-colored_container"></div>
      <div className="container h-100">
        <div className="second__section_container-main_heading text-uppercase flex-row flex-sm-column mb-2 mb-sm-4 d-flex justify-content-start justify-content-sm-start align-items-baseline align-items-sm-start">
          <div className="line__container mb-0 mb-sm-5" />
          vente d’instruments
          <br /> de musique
        </div>
        <div className="second__section_container-sub_heading text-uppercase py-2 py-sm-5 my-3 my-sm-5">
          ACCESSOIRES & LIBRAIRIE MUSICALE {h2_tag}
        </div>
        <div data-aos={"fade-up"} className="d-flex flex-column flex-xl-row h-100 position-relative mt-3 mt-sm-5" >
          <div className="col-12 d-flex flex-column flex-xl-row">
            <div className="col-12 col-xl-2">
              <div className="text-light vertical_container position-relative pt-0 pt-xl-4 ps-3 ps-xl-0 mt-4 mt-md-0 text-uppercase d-flex justify-content-start align-items-center">
                <div className="vertical_container_text">
                  instruments {h4_tag}
                </div>
              </div>
            </div>
            <AccordeonSection routeQuery="/instruments/" />
          </div>
        </div>
      </div>
    </div>
  );
};
