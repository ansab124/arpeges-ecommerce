import React from "react";

export const BestSellerCard = () => {
  const CardComponent = () => (
    <div className="product_content_section d-flex px-4 pt-4">
      <div className="product_image_container me-3">
        <img src="/assets/calque_98.png" alt="" />
      </div>
      <div className="product_content">
        <div className="product_content_heading jost_font text-dark text-uppercase">
          ALTO SEUL <br /> {`SANDNER 900 13"`}
        </div>
        <div className="product_content_sub_heading jost_font text-dark text-uppercase mt-0 mt-sm-2">
          AL MONTAGE LUTHIER
        </div>
        <div className="product_content_price theme_primary_color">
          1260,00€ TTC
        </div>
      </div>
    </div>
  );
  return (
    <div className="best_seller_card_container w-100">
      <div className="card_main_heading text-uppercase jost_font my-4">
        MEILLEURES VENTES
      </div>

      <div className="products_container pb-4">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
};
