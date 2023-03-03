import axios from "@helper/apiHelper";


export const getIntrumentsGroups = async () => {
  try {
    const response = await axios.get("groups");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getIntrumentsFamilies = async (slug) => {
  try {
    const response = await axios.get("category_list/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)

  }
}

export const getIntrumentsProductsFilter = async (slug) => {
  try {
    const response = await axios.get("product_instrument_filters/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)

  }
}

export const getIntrumentsFilteredProducts = async (slug, filters) => {
  try {
    const response = await axios.get("product_instrument_list/" + slug, { params: filters });
    console.log({ response })
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getIntrumentProductDetails = async (slug) => {
  try {
    const response = await axios.get("product_instrument_show/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getIntrumentProductRelated = async (slug) => {
  try {
    const response = await axios.get("releated_instrument_show/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getIntrumentsRelated = async (slug) => {
  try {
    const response = await axios.get("releated_products_group/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getPromotionIntruments = async (payload) => {
  try {
    const response = await axios.get("promotion_instruments", { params: payload });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getUsedInstrumentFilters = async () => {
  try {
    const response = await axios.get("usedproduct_filters");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getUsedFilteredInstruments = async (payload) => {
  try {
    const response = await axios.get("usedproduct", { params: payload });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

