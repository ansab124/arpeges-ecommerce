import React from "react";
import { useState } from "react";

const OrdersAccordion = ({ order }) => {
  console.log({ order });
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion" id="lastOrder">
      <div className="accordion-item">
        <div className="responsiveTable">
          <table className="orderSnipHeader accordion-header" id="headingOne">
            <tbody>
              <tr>
                <td width={"10%"} className="orderNumber">
                  {order?.increment_id}
                </td>
                <td className="orderDate">{order?.order_date}</td>
                <td className="orderName">{order?.payment_title} </td>
                <td className="price">{order?.grand_total}</td>
                <td className="category">
                  EXPÉDIÉ{" "}
                  <span>
                    {" "}
                    <a href=""> - {order?.status}</a>{" "}
                  </span>{" "}
                </td>
                <td className="details">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => setOpen(!open)}
                  >
                    DÉTAILS
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${open ? "show" : "hide"}`}
          aria-labelledby="headingOne"
          data-bs-parent="#lastOrder"
        >
          <div className="accordion-body">
            <h3> Informations de la commande </h3>
            <div className="validation">
              {" "}
              {order?.order_date}, VALIDATION SOFINCO - 6 FOIS{" "}
            </div>

            <div className="row">
              <div className="col-md-12 col-lg-6 orderInfo">
                <h4> COMMANDE : {order?.increment_id} </h4>
                <p>
                  {" "}
                  (SOFINCO - 6 FOIS) passée le <span>
                    {order?.order_date}
                  </span>{" "}
                </p>

                <h4>PRODUITS</h4>
                <div className="responsiveTable">
                  <table className="table tableResponsive products">
                    <tbody>
                      {order?.items?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="productName">
                              {" "}
                              <span>{item?.quantity}x </span>{" "}
                              {item?.name || "-"}
                            </td>
                            <td className="price">
                              {/* <span className="discount"> 491,00€ TTC </span> */}
                              {item?.grant_total} TTC
                            </td>
                          </tr>
                        );
                      })}

                      {/* <tr>
                        <td className="productName">
                          {" "}
                          <span>1x </span> TITRE_1 LOREM IPSUM DOLOR SIT MET
                          ELIT INSTRUMENT TROMPETTE
                        </td>
                        <td className="price">58,70€ TTC </td>
                      </tr>
                      <tr>
                        <td className="format">Format : Numérique </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <h4> ADRESSE DE LIVRAISON </h4>
                <p>
                  {order?.shipping_address?.first_name}{" "}
                  {order?.shipping_address?.first_name}
                  <br />
                  {order?.shipping_address?.company_name}
                  <br />
                  {order?.shipping_address?.address1[0]}
                  <br />
                  {/* Adresse ligne 2<br /> */}
                  {/* Complément adresse */}
                  <br />
                  {order?.shipping_address?.postcode}{" "}
                  {order?.shipping_address?.city}
                  <br />
                  {order?.shipping_address?.phone}
                  <br />
                  {order?.shipping_address?.country_name}
                </p>

                <h4> Livraison {order?.shipping_title} </h4>
                <p className="suivi">
                  {" "}
                  Suivi N° <a href=""> XXXXXXXXX </a>{" "}
                </p>

                <h4> MODE DE PAIEMENT </h4>
                <p> {order?.payment_title} </p>
              </div>

              <div className="col-md-12 col-lg-6 orderCalc">
                <h4>DÉTAILS DE LA FACTURE</h4>
                <div className="responsiveTable">
                  <table className="table tableResponsive">
                    <tbody>
                      <tr>
                        <td>Sous-total TTC </td>
                        <td>{order?.sub_total}</td>
                      </tr>
                      <tr>
                        <td>Eco taxe TTC</td>
                        <td>- </td>
                      </tr>
                      <tr>
                        <td>Livraison {order?.shipping_title}</td>
                        <td>-</td>
                      </tr>

                      <tr>
                        <td className="promo">
                          Code promo
                          {/* <span>SOLDES0622</span> */}
                        </td>
                        <td> -</td>
                      </tr>

                      <tr>
                        <td>dont TVA </td>
                        <td> - </td>
                      </tr>

                      <tr>
                        <td>dont TVA </td>
                        <td> - </td>
                      </tr>

                      <tr className="total">
                        <td>Total TTC </td>
                        <td>{order?.grand_total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersAccordion;
