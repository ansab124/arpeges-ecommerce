import axios from "@helper/apiHelper";

export const checkEmailExist = async (payload) => {
  try {
    const response = await axios.post("customer/check_mail", payload);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response?.data }
    }
    return { error: true, message: error?.message || "error occured" }
  }
};


export const userLogin = async (payload) => {
  try {
    delete payload.error
    const response = await axios.post("customer/login?token=true", payload);
    axios.defaults.headers.common['Authorization'] = "Bearer " + response.data?.token;
    localStorage.setItem("token", response.data?.token);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response?.data }
    }
    return { error: true, message: error?.message || "error occured" }
  }
};

export const userRegister = async (payload) => {
  try {
    const response = await axios.post("customer/register", payload);

    if (response?.data?.status == true) {
      return { ...response.data, error: false };
    }
    else {
      return { ...response.data, error: true };

    }
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get("customer/get");
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const getActivitiesAndCountriesList = async () => {
  try {
    const response = await axios.get("register_form_view");
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}


export const updateUserProfile = async (payload) => {
  try {
    const response = await axios.put("customer/profile", payload);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const getUserAddresses = async () => {
  try {
    const response = await axios.get("customer/addresses");
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const updateUserAddress = async (payload) => {
  try {
    const response = await axios.put("customer/addresses/" + payload.id, payload);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const userForgetPassword = async (payload) => {
  try {
    const response = await axios.post("customer/forgot-password", payload);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const userResetPassword = async (payload) => {
  try {
    const response = await axios.post("customer/reset-password", payload);
    return { ...response.data, error: false };
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response }
    }
    return { error: true, message: error?.message || "error occured" }
  }
}

export const updatePassword = async (payload) => {
  try {
    const response = await axios.post("customer/update_password?token=true", payload);
    return { ...response.data, error: false }
  }
  catch (error) {
    return { error: true, message: error?.message || "error occured" }

  }
}
