import CartSideBar from "./cartSideBar";
import IntlTelInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { savePaymentMethod } from "@store/thunk/cart";
import { saveOrder } from "@actions";
import { commonActions } from "@store/slices/common";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Step3 = ({ previousStep }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { paymentMethods } = useSelector((state) => state.cart);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPaymentMethod = (method) => {
    let payload = {
      payment: {
        method: "bankcheck",
      },
    };
    dispatch(savePaymentMethod(payload));
    setSelectedPaymentMethod(method);
  };
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      return toast("Please Select a Payment Method", {
        type: "warning",
        theme: "colored",
      });

    }
    setLoading(true);
    const response = await saveOrder();
    setLoading(false);
    dispatch(
      commonActions.showToast({ type: "success", message: response?.message })
    );
    router.push("/cart/confirmation");
  };

  const btnHandler = () => {
    console.log("aaa gyaa jayyy!!");
     previousStep
     console.log("Phir aaa gyaa jayyy!!");

  }

  return (
    <div className="step step03">
      <div className="stepKeysWrapper">
        <ul>
          <li className="completed">
            <div className="stepKey">
              <button>1</button>
            </div>
            <div className="stepTitle">Pannier</div>
          </li>

          <li className="completed">
            <div className="stepKey">
              <button onClick={previousStep}>2</button>
            </div>
            <div className="stepTitle">IDENTIFICATION / LIVRAISON</div>
          </li>

          <li className="active">
            <div className="stepKey">
              <button>3</button>
            </div>
            <div className="stepTitle">PAIEMENT</div>
          </li>
        </ul>
      </div>

      <h3> CHOISIR LE MODE DE PAIEMENT </h3>

      <div className="row">
        <div className="col-md-8">
          <div className="paymentOptions">
            <div className="promoCode">
              <label> CODE PROMO / RÉDUCTION </label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder=" "
                  aria-label=" "
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    OK
                  </button>
                </div>
              </div>
            </div>

            <ul className="paymentMethods">
              {paymentMethods &&
                paymentMethods.map((method, index) => {
                  return (
                    <li key={index} className="row">
                      <div className="col-1">
                        <input
                          type="checkbox"
                          checked={method?.code == selectedPaymentMethod}
                          onChange={() =>
                            handleSelectPaymentMethod(method?.code)
                          }
                        />
                      </div>
                      <div className="col-11">
                        <div className="row carrierItem">
                          <div className="col-md-8">
                            <h5> {method?.title} </h5>

                            <p className="carrier">{method?.description}</p>
                          </div>

                          <div className="col-md-4 carrierCost paymentMethod">
                            <img src={method?.image} alt="" />
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
                    <div className="col-md-8">
                      <h5> PLUSIEURS FOIS AVEC SOFINCO </h5>
                      <select>
                        <option value="">3 fois sans frais</option>
                      </select>
                      <p className="carrier">
                        Vous allez être redirigé vers une page de paiement
                        externe et 100% sécurisé afin de déposer votre demande
                        de crédit.
                      </p>
                    </div>

                    <div className="col-md-4 carrierCost paymentMethod">
                      <img src="/assets/payment/sofinco.png" alt="" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 PaymentExtraNote">
                  <div>
                    <p>
                      Vous serez débité du montant de votre commande{" "}
                      <span>
                        {" "}
                        en trois échéances sur votre carte bancaire.{" "}
                      </span>{" "}
                      Le 1er débit aura lieu le jour de la commande.
                    </p>

                    <div className="specialPrice">
                      3 mensualités de :<span> 132,57€ TTC </span>
                    </div>
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-8">
                      <h5> VIREMENT BANCAIRE </h5>

                      <p className="carrier">
                        Vous allez être redirigé vers une page de paiement
                        externe et 100% sécurisé afin de finaliser la
                        transaction.
                      </p>
                    </div>

                    <div className="col-md-4 carrierCost paymentMethod">
                      <img src="/assets/payment/wire.png" alt="" />
                    </div>
                  </div>
                </div>
              </li>

              <li className="row">
                <div className="col-1">
                  <input type="checkbox" />
                </div>
                <div className="col-11">
                  <div className="row carrierItem">
                    <div className="col-md-8">
                      <h5> CHÈQUE BANCAIRE </h5>

                      <p className="carrier">
                        {`Votre commande ne sera traitée qu'à réception de votre chèque, les 
informations vous seront communiquées après validation.`}
                      </p>
                    </div>

                    <div className="col-md-4 carrierCost paymentMethod">
                      <img src="/assets/payment/check.png" alt="" />
                    </div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>

        <CartSideBar onPayment={handlePayment} loading={loading} />
      </div>
    </div>
  );
};

export default Step3;
