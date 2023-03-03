import { addToCart,
     getCart, 
     removeProductFromCart,
      updateProductQuantityCart,
       getShippingMehodList,
        getPaymentMehodList, 
        savePaymentMehod,
         saveShippingMehod,
          saveOrder,
           saveAddresses,
           getWishListProducts,
        addProductToWishList } from "@actions";
import { cartActions } from "@store/slices/cart";
import { commonActions } from "@store/slices/common";

export const addProductToCart = (payload) => async (dispatch) => {

    try {
        const id = localStorage.getItem("cartId")
        dispatch(commonActions.getRequest())
        const response = await addToCart(payload, id)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
            dispatch(commonActions.showToast({ message: response?.message, type: "success" }))
            dispatch(cartActions.updateCartDetails(response?.data))
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
        dispatch(commonActions.showToast({ message: error?.response?.message, type: "error" }))

    }
}

export const removeProductFromProduct = (itemId) => async (dispatch) => {
    try {
        const id = localStorage.getItem("cartId")
        dispatch(commonActions.getRequest())
        const response = await removeProductFromCart(id, itemId)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
            dispatch(cartActions.updateCartDetails(response?.data))
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const updateProductFromCart = (payload) => async (dispatch) => {
    try {
        const id = localStorage.getItem("cartId")
        dispatch(commonActions.getRequest())
        const response = await updateProductQuantityCart(id, payload)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
            dispatch(cartActions.updateCartDetails(response?.data))
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const getCartDetails = () => async (dispatch) => {
    try {
        const id = localStorage.getItem("cartId")
        dispatch(commonActions.getRequest())
        const response = await getCart(id)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
            dispatch(cartActions.updateCartDetails(response?.data))
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}


export const getShippingMethods = () => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await getShippingMehodList()
        if (!response.error) {
            dispatch(cartActions.getShippingMethods(response?.shipping_methods || []))
            dispatch(cartActions.getUserAddresses(response?.addresses || {}))

            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}


export const getPaymentMethods = () => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await getPaymentMehodList()
        if (!response.error) {
            dispatch(cartActions.getPaymentMethods(response?.data))
            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }

    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}



export const savePaymentMethod = (payload) => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await savePaymentMehod(payload)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}


export const saveShippingMethod = (payload) => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await saveShippingMehod(payload)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const saveUserOrder = (payload) => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await saveOrder(payload)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const saveUserAddresses = (payload) => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await saveAddresses(payload)
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const getUserWishList = () => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await getWishListProducts()
        if (!response.error) {
            dispatch(commonActions.getRequestSuccess())
            dispatch(cartActions.getWishList(response?.data))
        }
        else {
            dispatch(commonActions.getRequestFailure())
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}

export const addToWishList = (productId) => async (dispatch) => {
    try {
        dispatch(commonActions.getRequest())
        const response = await addProductToWishList(productId);
        console.log({response})
        if (!response.error) {
            if(response.data){
                dispatch(cartActions.addToWishList(response?.data))}
            else{
                dispatch(cartActions.removeFromWishList(productId))
            }
            
            dispatch(commonActions.getRequestSuccess())
            dispatch(commonActions.showToast({ message: response?.message, type: "success" }))
        }
        else {
            dispatch(commonActions.getRequestFailure())
            dispatch(
              commonActions.showToast({
                message: response?.message,
                type: "error",
              })
            );
        }
    } catch (error) {
        dispatch(commonActions.getRequestFailure())
    }
}