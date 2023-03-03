import { saveAddresses, saveShippingMehod } from "@actions";
import { getShippingMethods, saveShippingMethod } from "@store/thunk/cart";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CartSideBar from "./cartSideBar";

const Step2 = ({ prevStep }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { shippingMethods, addresses } = useSelector((state) => state.cart);
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState(null);



  useEffect(() => {
    shippingMethods &&
      shippingMethods?.length == 0 &&
      dispatch(getShippingMethods());
  }, []);

  const submitFormData = async (e) => {
    if (!selectedShipping) {
      return toast("Please Select a Shipping Method", {
        type: "warning",
        theme: "colored",
      });

    }
    router.push({
      path: "/cart",

      query: {
        step: "payment",
      }
    })


    e.preventDefault();
    setLoading(true);
    let payload = {
      billing: {
        address_id: addresses?.billing_addresses?.id,
      },
      shipping: {
        address_id: addresses?.shipping_address?.id,
      },
    };
    await saveAddresses(payload);
    let shippingPayload = {
      shipping_method: "chrono_post_chrono_post",
    };
    await saveShippingMehod(shippingPayload);
    setLoading(false);
    // nextStep();
  };
  const handleSelectedShipping = (method) => {
    setSelectedShipping(method);
  };


  return (
    <div className="step step02">

      <div className="stepKeysWrapper">
        <ul>
          <li className="completed">
            <div className="stepKey">
              <button onClick={prevStep}>1</button>
            </div>
            <div className="stepTitle">Pannier</div>
          </li>

          <li className="active">
            <div className="stepKey">
              <button>2</button>
            </div>
            <div className="stepTitle">IDENTIFICATION / LIVRAISON</div>
          </li>

          <li>
            <div className="stepKey">
              <button onClick={submitFormData}>3</button>
            </div>
            <div className="stepTitle">PAIEMENT</div>
          </li>
        </ul>
      </div>

      <h3> CHOISIR LA LIVRAISON </h3>

      <div className="row stepCols">
        <div className="col-md-8">
          <div className="deliveryOptions">
            <ul>
              {shippingMethods &&
                shippingMethods?.map((method, index) => {
                  return (
                    <li key={index} className="row">
                      <div className="col-1">
                        <input
                          type="checkbox"
                          checked={selectedShipping == method?.code}
                          onChange={() => handleSelectedShipping(method?.code)}
                        />
                      </div>
                      <div className="col-11">
                        <div className="row carrierItem">
                          <div className="col-md-6">
                            <h5> {method?.title} </h5>
                            {/* <select>
                              <option value="">PARIS</option>
                            </select> */}
                            <p className="carrier">{method?.description}</p>
                          </div>
                          <div className="col-md-3">
                            <img
                              src={method?.image}
                              alt={method?.title || "image"}
                            />
                          </div>
                          <div className="col-md-3 carrierCost">
                            {method?.price}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

              {/* <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/laposte.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/3.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/4.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/tnt.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>

                <div className="contactCompany">
                  <div className="companyNote ">
                    Pour le suivi de votre commande, merci de{" "}
                    <span> vérifier votre numéro de téléphone portable.</span>{" "}
                    <br />
                    Pour modifier le numéro, cliquez dessus.
                  </div>

                  <div className="companyTel">
                    <IntlTelInput
                      containerClass="w-full"
                      inputClass="w-full"
                      country={"fr"}
                      preferredCountries={["fr"]}
                    />
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/3.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>

                <div className="mapContainer">
                  <img src="/assets/delivery/map-placeholder.jpg" alt="" />
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-6">
                      <h5> RETRAIT EN BOUTIQUE </h5>
                      <select>
                        <option value="">PARIS</option>
                      </select>
                      <p className="carrier">
                        Paris : du lundi au samedi de 9h-13h et 14h-19h
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src="/assets/delivery/laposte.png" alt="" />
                    </div>
                    <div className="col-md-3 carrierCost">00,00€ TTC</div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>

        <CartSideBar submitStep={submitFormData} loading={loading} />
      </div>
    </div>
  );
};

export default Step2;
