import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    wishList:[],
    details: {},
    items: [],
    cartId: null,
    shippingMethods: [],
    paymentMethods: [],
    addresses: {}
}

if (typeof window !== "undefined") {
    const id = localStorage.getItem("cartId")
    initialState.cartId = id
}

const getCartDetails = (state, { payload }) => {
    state.details = { ...payload }
}

const updateCartDetails = (state, { payload }) => {
    state.details = { ...payload }
}
const getShippingMethods = (state, { payload }) => {
    state.shippingMethods = payload
}

const getPaymentMethods = (state, { payload }) => {
    state.paymentMethods = payload
}


const getUserAddresses = (state, { payload }) => {
    state.addresses = payload
}

const getWishList=(state,{payload})=>{
    state.wishList=payload?.map(item=>item?.product_id);
}


const addToWishList=(state,{payload})=>{
    state.wishList=[...state.wishList,payload.product_id];
}
const removeFromWishList=(state,{payload})=>{
    state.wishList=state.wishList.filter(item=>item!=payload);
}




const setCartId = (state, { payload }) => {
    state.cartId = payload
}
const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartId,
        getCartDetails,
        updateCartDetails,
        getShippingMethods,
        getPaymentMethods,
        getUserAddresses,
        getWishList,
        addToWishList,
        removeFromWishList
    },
})

export const cartActions = cartslice.actions

export const cartReducer = cartslice.reducer