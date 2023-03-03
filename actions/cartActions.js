import axios from "@helper/apiHelper";

export const addToCart = async (payload, id) => {
    try {
        let url = id ? `customer/cart/add/${payload.product_id}?token=true&cart_id=${id}` : `customer/cart/add/${payload.product_id}?token=true`
        const response = await axios.post(url, payload);
        localStorage.setItem("cartId", response.data?.data?.id)
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const getCart = async (id) => {
    try {
        let url = id ? `customer/cart?token=true&cart_id=${id}` : `customer/cart?token=true`
        const response = await axios.get(url);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const removeProductFromCart = async (cartId, cart_item_id) => {
    try {
        let url = cartId ? `customer/cart/remove/${cart_item_id}?token=true&cart_id=${cartId}` : `customer/cart/remove/${cart_item_id}?token=true`

        const response = await axios.delete(url);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const updateProductQuantityCart = async (cartId, payload) => {
    try {
        let url = cartId ? `customer/cart/update?token=true&cart_id=${cartId}` : `customer/cart/update?token=true`
        const response = await axios.put(url, payload);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const getShippingMehodList = async () => {
    try {
        const response = await axios.get("shipping_list");
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const getPaymentMehodList = async () => {
    try {
        const response = await axios.get("payment_list");
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};


export const savePaymentMehod = async (payload) => {
    try {
        const id = localStorage.getItem("cartId")
        const response = await axios.post("customer/checkout/save-payment?token=true&cart_id=" + id, payload);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const saveShippingMehod = async (payload) => {
    try {
        const id = localStorage.getItem("cartId")
        const response = await axios.post("customer/checkout/save-shipping?token=true&cart_id=" + id, payload);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const saveOrder = async (payload) => {
    try {
        const id = localStorage.getItem("cartId")
        const response = await axios.post("customer/checkout/save-order?token=true&cart_id=" + id);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const saveAddresses = async (payload) => {
    try {
        const id = localStorage.getItem("cartId")
        const response = await axios.post("customer/checkout/save-address?token=true&cart_id=" + id, payload);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const getOrders = async () => {
    try {
        const response = await axios.get("customer/orders");
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};


export const addProductToWishList = async (productId) => {
    try {
        const response = await axios.post("customer/wishlist/"+productId);
        return { ...response.data, error: false };
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};

export const getWishListProducts = async () => {
    try {
        const response = await axios.get("customer/wishlist");
        return { ...response.data, error: false };
        // console.log("dataaa---aaa---aaa", response?.data);
    } catch (error) {
        if (error.response) {
            return { error: true, ...error.response?.data }
        }
        return { error: true, message: error?.message || "error occured" }
    }
};


