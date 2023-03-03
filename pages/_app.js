
import "../styles/main.scss";
import { Layout } from "../layout";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.css";
import ProgressBar from "@badrap/bar-of-progress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AOS from "aos";
import store from "@store";
import { Provider, useDispatch, useSelector } from 'react-redux';
import setupInterceptor from "@helper/setupInterceptor";
import "../styles/spinner.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { commonActions } from "@store/slices/common";


function ArpegesApp({ Component, pageProps }) {

  let router = useRouter();
  const layoutExcludedRoutes = ["/search"];
  const progress = new ProgressBar({
    size: 2,
    color: "#0098cc",
    className: "bar-of-progress",
    delay: 100,
  });
  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeComplete", progress.finish);
    router.events.on("routeChangeError", progress.finish);
  }, [router]);


  useEffect(() => {
    setupInterceptor();
    AOS.init({
      once: false,
    });
  }, []);



  const WrappedComponent = () => {
    const dispatch = useDispatch()
    const { visible, message, type } = useSelector((state) => state.common)
    useEffect(() => {
      if (visible) {
        toast[type || "info"](message, { onClose: () => dispatch(commonActions.hideToast()) })

      }
    }, [visible])


    return <>
      <Component {...pageProps} />
      <ToastContainer style={{ minHeight: 20 }} theme="colored" />

    </>
  }
  return (

    <Provider store={store}>
      {layoutExcludedRoutes.includes(router.pathname) ? (
        <WrappedComponent />
      ) : (
        <Layout>
          <WrappedComponent />
        </Layout>


      )}

    </Provider>


  );
}
setupInterceptor(store)


export default ArpegesApp;
