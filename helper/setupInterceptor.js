import { handleClearUserData } from "@store/thunk";
import axiosInstance from "./apiHelper";


const setup = (store) => {

  // const { dispatch } = store
  axiosInstance.interceptors.request.use(
    (config) => {
      let token;
      if (typeof window != "undefined") {
        token = localStorage.getItem("token");
      }

      config.headers["Authorization"] = "Bearer " + token;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.response.status == 401 && err) {
        try {
          store?.dispatch(handleClearUserData())
          return axiosInstance(err.config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
