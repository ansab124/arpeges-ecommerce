import axios from "@/helper/apiHelper";


export const getHomePageProductsRelated = async () => {
  try {
    const response = await axios.get("releated_products_home");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getMostSellingProduct = async () => {
  try {
    const response = await axios.get("most_sales");
    console.log(response, "resssss")
    return response.data;
  } catch (error) {
    console.log(error)
  }
}



export const getInstrumentsMenu = async () => {
  try {
    const response = await axios.get("categories_menu");
    return response.data;
  } catch (error) {
    console.log({ error })
  }

}
