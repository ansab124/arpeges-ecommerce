import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Sidebar from "../../components/dashboard/SideBar";
import { useEffect } from "react";
import { getOrders } from "@actions";
import { useState } from "react";
import OrdersAccordion from "@components/dashboard/OrdersAccordion";
// bootstrap / dist / js / bootstrap.bundle.min.js;
// if (typeof window != "undefined") {
//   require("bootstrap/dist/js/bootstrap.bundle");
// }
const Commandes = () => {
  const [orders, setOrders] = useState({});
  const getOrdersList = async () => {
    let response = await getOrders({ page: 1 });
    setOrders(response);
  };
  useEffect(() => {
    getOrdersList();
  }, []);

  console.log({ orders });

  return (
    <div className="container my-3 my-sm-5 dashboardPage ordersPage">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem>Mon compte</BreadcrumbItem>
          <BreadcrumbItem>MES CODES PROMO</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="compteContainer">
        <div className="row">
          <Sidebar />

          <div className="col-md-8 compteDetails">
            <h1> MES COMMANDES </h1>

            <h2> Ma dernière commande </h2>
            {orders?.data?.map((order, index) => {
              return <OrdersAccordion key={index} order={order} />;
            })}

            {/* <div className="ordersFilter">
              <div className="header">
                <h2> Historique de mes commandes </h2>
                <div className="filterInput">
                  {" "}
                  <select name="" id="">
                    <option value=""> 30 derniers jours </option>
                    <option value=""> 6 derniers mois </option>
                  </select>
                </div>
              </div>

              <div className="accordion" id="orderHistory">
                <div className="accordion-item">
                  <div className="responsiveTable">
                    <table
                      className="orderSnipHeader accordion-header"
                      id="headingOne"
                    >
                      <tr>
                        <td className="orderNumber">65667627631</td>
                        <td className="orderDate">01/07/2022</td>
                        <td className="orderName">ATT. VIREMENT </td>
                        <td className="price">427,90€</td>
                        <td className="category">
                          EXPÉDIÉ{" "}
                          <span>
                            {" "}
                            <a href=""> - SUIVI</a>{" "}
                          </span>{" "}
                        </td>
                        <td className="details">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseH1"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            DÉTAILS
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div
                    id="collapseH1"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#orderHistory"
                  >
                    <div className="accordion-body">
                      <h3> Informations de la commande </h3>
                      <div className="validation">
                        {" "}
                        01/07/2022, VALIDATION SOFINCO - 6 FOIS{" "}
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-6 orderInfo">
                          <h4> COMMANDE : 65667619567 </h4>
                          <p>
                            {" "}
                            (SOFINCO - 6 FOIS) passée le <span>
                              01/07/2022
                            </span>{" "}
                          </p>

                          <h4>PRODUITS</h4>
                          <div className="responsiveTable">
                            <table className="table tableResponsive products">
                              <tr>
                                <td className="productName">
                                  {" "}
                                  <span>1x </span> YAMAHA YCL 250SUK
                                </td>
                                <td className="price">
                                  <span className="discount">
                                    {" "}
                                    491,00€ TTC{" "}
                                  </span>
                                  389,00€ TTC
                                </td>
                              </tr>

                              <tr>
                                <td className="productName">
                                  {" "}
                                  <span>1x </span> TITRE_1 LOREM IPSUM DOLOR SIT
                                  MET ELIT INSTRUMENT TROMPETTE
                                </td>
                                <td className="price">58,70€ TTC </td>
                              </tr>
                              <tr>
                                <td className="format">Format : Numérique </td>
                              </tr>
                            </table>
                          </div>
                          <h4> ADRESSE DE LIVRAISON </h4>
                          <p>
                            Prénom NOM <br />
                            Nom société
                            <br />
                            Adresse ligne 1<br />
                            Adresse ligne 2<br />
                            Complément adresse
                            <br />
                            92200 Neuilly-sur-Seine
                            <br />
                            +336 55 88 99 66
                          </p>

                          <h4> Livraison rapide 48h TNT </h4>
                          <p className="suivi">
                            {" "}
                            Suivi N° <a href=""> XXXXXXXXX </a>{" "}
                          </p>

                          <h4> MODE DE PAIEMENT </h4>
                          <p> En plusieurs fois par SOFINCO : 6 fois. </p>
                        </div>

                        <div className="col-md-12 col-lg-6 orderCalc">
                          <h4>DÉTAILS DE LA FACTURE</h4>

                          <div className="responsiveTable">
                            <table className="table">
                              <tr>
                                <td>Sous-total TTC </td>
                                <td>447,70€</td>
                              </tr>
                              <tr>
                                <td>Eco taxe TTC</td>
                                <td>00,30€ </td>
                              </tr>
                              <tr>
                                <td>Livraison rapide 48H (TNT)</td>
                                <td>29,90€</td>
                              </tr>

                              <tr>
                                <td className="promo">
                                  Code promo <span>SOLDES0622</span>
                                </td>
                                <td> - 50,00€</td>
                              </tr>

                              <tr>
                                <td>dont TVA 20%</td>
                                <td> - 28,59€ </td>
                              </tr>

                              <tr>
                                <td>dont TVA 5.5%</td>
                                <td> - 3,97€ </td>
                              </tr>

                              <tr className="total">
                                <td>Total TTC </td>
                                <td>427,90€</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="responsiveTable">
                    <table
                      className="orderSnipHeader accordion-header"
                      id="headingOne"
                    >
                      <tr>
                        <td className="orderNumber">65667627631</td>
                        <td className="orderDate">01/07/2022</td>
                        <td className="orderName">ATT. VIREMENT </td>
                        <td className="price">427,90€</td>
                        <td className="category">
                          EXPÉDIÉ{" "}
                          <span>
                            {" "}
                            <a href=""> - SUIVI</a>{" "}
                          </span>{" "}
                        </td>
                        <td className="details">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseH2"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            DÉTAILS
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div
                    id="collapseH2"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#orderHistory"
                  >
                    <div className="accordion-body">
                      <h3> Informations de la commande </h3>
                      <div className="validation">
                        {" "}
                        01/07/2022, VALIDATION SOFINCO - 6 FOIS{" "}
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-6 orderInfo">
                          <h4> COMMANDE : 65667619567 </h4>
                          <p>
                            {" "}
                            (SOFINCO - 6 FOIS) passée le <span>
                              01/07/2022
                            </span>{" "}
                          </p>

                          <h4>PRODUITS</h4>
                          <div className="responsiveTable">
                            <table className="table tableResponsive products">
                              <tr>
                                <td className="productName">
                                  {" "}
                                  <span>1x </span> YAMAHA YCL 250SUK
                                </td>
                                <td className="price">
                                  <span className="discount">
                                    {" "}
                                    491,00€ TTC{" "}
                                  </span>
                                  389,00€ TTC
                                </td>
                              </tr>

                              <tr>
                                <td className="productName">
                                  {" "}
                                  <span>1x </span> TITRE_1 LOREM IPSUM DOLOR SIT
                                  MET ELIT INSTRUMENT TROMPETTE
                                </td>
                                <td className="price">58,70€ TTC </td>
                              </tr>
                              <tr>
                                <td className="format">Format : Numérique </td>
                              </tr>
                            </table>
                          </div>
                          <h4> ADRESSE DE LIVRAISON </h4>
                          <p>
                            Prénom NOM <br />
                            Nom société
                            <br />
                            Adresse ligne 1<br />
                            Adresse ligne 2<br />
                            Complément adresse
                            <br />
                            92200 Neuilly-sur-Seine
                            <br />
                            +336 55 88 99 66
                          </p>

                          <h4> Livraison rapide 48h TNT </h4>
                          <p className="suivi">
                            {" "}
                            Suivi N° <a href=""> XXXXXXXXX </a>{" "}
                          </p>

                          <h4> MODE DE PAIEMENT </h4>
                          <p> En plusieurs fois par SOFINCO : 6 fois. </p>
                        </div>

                        <div className="col-md-12 col-lg-6 orderCalc">
                          <h4>DÉTAILS DE LA FACTURE</h4>
                          <div className="responsiveTable">
                            <table className="table tableResponsive">
                              <tr>
                                <td>Sous-total TTC </td>
                                <td>447,70€</td>
                              </tr>
                              <tr>
                                <td>Eco taxe TTC</td>
                                <td>00,30€ </td>
                              </tr>
                              <tr>
                                <td>Livraison rapide 48H (TNT)</td>
                                <td>29,90€</td>
                              </tr>

                              <tr>
                                <td className="promo">
                                  Code promo <span>SOLDES0622</span>
                                </td>
                                <td> - 50,00€</td>
                              </tr>

                              <tr>
                                <td>dont TVA 20%</td>
                                <td> - 28,59€ </td>
                              </tr>

                              <tr>
                                <td>dont TVA 5.5%</td>
                                <td> - 3,97€ </td>
                              </tr>

                              <tr className="total">
                                <td>Total TTC </td>
                                <td>427,90€</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commandes;
