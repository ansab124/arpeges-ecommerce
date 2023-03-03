import React from "react";
import Input from "./controls/Input";
import { AntSelectDropDown } from "./controls/AntSelectDropDown";
export const RechercherPartition = ({
  rechercherPartitionCLass = "dropdown__container p-4 p-lg-3 p-xl-4 mt-5",
  displayHeading = true,
}) => {
  return (
    <div className={rechercherPartitionCLass}>
      {displayHeading ? (
        <div className="rechercher_partition_heading text-uppercase text-light jost_font pb-3">
          RECHERCHER UNE PARTITION
        </div>
      ) : null}
      <div className="d-flex w-100 mb-5 mt-3 dropdown__container_content">
        <div className="d-flex flex-column px-3 px-lg-2 px-xl-3">
          <div className="line__container"></div>
          <div className="number__heading text-light mt-3">01</div>
        </div>
        <div className="d-flex align-items-end w-100">
          <AntSelectDropDown placeholder="Par compositeur..." />
        </div>
      </div>
      <div className="d-flex w-100 mb-5 dropdown__container_content">
        <div className="d-flex flex-column px-3 px-lg-2 px-xl-3">
          <div className="line__container"></div>
          <div className="number__heading text-light mt-3">02</div>
        </div>
        <div className="d-flex align-items-end w-100">
          <AntSelectDropDown placeholder="Par Instrument..." />

        
        </div>
      </div>
      
      <div className="d-flex w-100 mb-4 dropdown__container_content">
        <div className="d-flex flex-column px-3 px-lg-2 px-xl-3">
          <div className="line__container"></div>
          <div className="number__heading text-light mt-3">03</div>
        </div>
        <div className="d-flex align-items-end  w-100">
          <Input block className="mb-0" placeholder="Par titre..." />
        </div>
      </div>
      <div className="d-flex pt-3 justify-content-center justify-content-lg-end">
        <button className="third__section_container-button text-light d-flex justify-content-center align-items-center px-4">
          VALIDER
        </button>
      </div>
    </div>
  );
};
