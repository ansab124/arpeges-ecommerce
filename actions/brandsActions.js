import axios from "@helper/apiHelper";


export const getBrandsMenu = async () => {
  try {
    const response = await axios.get("brand_menu");
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const getBrandsList = async (letter) => {
  try {
    const response = await axios.get("brand_list", { params: { letter } });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getBrandProductsFilters = async (brand) => {
  try {
    const response = await axios.get("product_brand_filters/" + brand);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getBrandFilteredProducts = async (brand, query) => {
  try {
    const response = await axios.get("product_brand_list/" + brand, { params: query });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getBrandsSliderList = async () => {
  try {
    const response = await axios.get("brands_btm_list");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

