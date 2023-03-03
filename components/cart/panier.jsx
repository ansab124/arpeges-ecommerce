import { getPaymentMethods, getShippingMethods } from "@store/thunk/cart";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Panier = () => {
  const dispatch = useDispatch();
  const { shippingMethods, paymentMethods } = useSelector(
    (state) => state.cart
  );
  // const [step, setstep] = useState(1);
  const router = useRouter()
  let step = router.query.step
  useEffect(() => {
    paymentMethods &&
      paymentMethods?.length == 0 &&
      dispatch(getPaymentMethods());
  }, [shippingMethods, paymentMethods]);



  const prevStep = () => {
    router.push({ path: "viewcart" })
  };


  const previousStep = () => {

    router.push({
      path: "/cart",

      query: {
        step: "identity",
      }
    })
  };

  switch (step) {
    case "viewcart":
      return <Step1 />;

    case "identity":
      return <Step2 prevStep={prevStep} />;

    case "payment":
      return <Step3 previousStep={previousStep} />;

    // default case to show nothing
    default:
      return <Step1 />
  }
};

export default Panier;
