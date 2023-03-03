import React from "react";
import { RechercherPartition } from "./RechercherPartition";



export const ThirdSection = () => {
  const h4_tag = "<h4>";
  return (
    <div className="third__section_container mt-5">
      <div className="container pb-5">
        <div className="third__section_container-heading__container text-uppercase mb-3 mb-sm-5">
          RECHERCHER UNE PARTITION
        </div>
        <div className="col-12 position-relative d-flex flex-column flex-lg-row" >
          <div className="col-12 d-flex flex-column flex-xl-row">
            <div className="col-12 col-xl-2 d-flex align-items-end mb-3 mb-xl-0">
              <div className="text-light vertical_container text-uppercase d-flex justify-content-start ps-3 ps-lg-0 pt-0 pt-lg-4 my-3 my-sm-0 align-items-center">
                <div className="vertical_container_text">
                  PARTITIONS {h4_tag}
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-10 d-flex flex-wrap mt-4 mt-lg-0" >
              <div className="col-12 col-md-12 col-lg-8 flex-wrap pe-0 pe-lg-3 pe-xl-0">
                <div className="col-12 d-flex" data-aos={"fade-right"}>
                  <div className="col-5 d-none d-xl-inline-block image__container">
                    <img
                      src={`/assets/calque_70.svg`}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <RechercherPartition
                    rechercherPartitionCLass="col-7 dropdown__container p-4"
                    displayHeading={false}
                    
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4 d-flex mt-4 mt-lg-0">
                <img
                  src={`/assets/calque_71.svg`}
                  className="w-100 ad_image"
                  alt="ad-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
