import React, { useEffect } from "react";
import { Header } from "./header";
import Footer from "./footer"; 
import { useSelector, useDispatch } from "react-redux";
import { handleGetUserData } from "@store/thunk";
import { getCartDetails,getUserWishList } from "@store/thunk/cart";


export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const cartId = useSelector((state) => state.cart.cartId);
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    userToken && dispatch(handleGetUserData());
    cartId && dispatch(getCartDetails());
    userToken && dispatch(getUserWishList());
  }, []);

  return (
    <div className="position-relative">
      {loading && <div className="lmask"></div>}
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
