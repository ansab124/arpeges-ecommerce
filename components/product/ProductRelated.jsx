import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const IconButton = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`d-flex align-items-center gap-3 ${active ? "active" : ""}`}
    >
      {text}
      <IoIosArrowRoundForward size={20} />
    </button>
  );
};

const ProductRelated = ({ details, isPartition }) => {
  const [activeButton, setActiveButton] = useState("description");

  const renderDetailDescription = (obj) => {
    // delete obj?.title;
    return Object.keys(obj).map((key) => {
      return obj[key] && <li>{obj[key]}</li>;
    });
  };

  return (
    <div className="product_related  ">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-12 col-12 product_related_tabs">
                <h3>partitions trompette</h3>
                <div className="product_related_buttons d-flex flex-column gap-4">
                  {!isPartition && (
                    <IconButton
                      active={activeButton == "fetch"}
                      text="fiche technique"
                      onClick={() => setActiveButton("fetch")}
                    />
                  )}
                  <IconButton
                    active={activeButton == "description"}
                    text="description"
                    onClick={() => setActiveButton("description")}
                  />
                  <IconButton
                    active={activeButton == "character"}
                    text={`${
                      isPartition ? "CONTENU DE L'OUVRAGE" : "CARACTÉRISTIQUES"
                    }`}
                    onClick={() => setActiveButton("character")}
                  />
                </div>
              </div>
              {activeButton == "description" && (
                <div className="col-xl-7 col-lg-7 col-12">
                  <div className="product_related_content">
                    <h3 className="product_related_content-bold">
                      {details?.description_section?.title}
                    </h3>
                    <p>{details?.description_section?.description}</p>
                  </div>
                  {details?.description_section?.details && (
                    <div className="product_related_content">
                      <h3 className="product_related_content-bold">
                        {details?.description_section?.details?.title}
                      </h3>
                      <ul>
                        {renderDetailDescription(
                          details?.description_section?.details
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeButton == "character" && (
                <div className="col-xl-7 col-lg-7 col-12">
                  <div className="product_related_content">
                   
                    <ul className="product_related_content-attributes">
                      {!isPartition
                        ? details?.attr?.map((attr, index) => {
                            return (
                              <li key={attr?.label + index}>
                                <span>{attr?.label}</span>
                                <span>{attr?.value}</span>
                              </li>
                            );
                          })
                        : details?.album_section.map((item, index) => {
                            return (
                              <div key={item?.title_1 + index}>
                                <li key={item?.title1 + index}>
                                  <span>Titre</span>
                                  <div>
                                    <p>{item?.title_1}</p>
                                    <p>{item?.title_2}</p>
                                  </div>
                                </li>
                                <li>
                                  <span>Compositeur</span>
                                  <span>{item?.composer} </span>
                                </li>
                                <li>
                                  <span>Interprète</span>
                                  <span>{item?.instrument} </span>
                                </li>
                              </div>
                            );
                          })}
                    </ul>
                  </div>
                </div>
              )}

              {activeButton == "fetch" && (
                <div className="col-xl-7 col-lg-7 col-12">
                  <div className="product_related_content">
                    <p>{details?.technical_data}</p>
                
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRelated;
