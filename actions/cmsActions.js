import axios from "@/helper/apiHelper";


export const getCmsPage = async (id) => {
  try {
    const response = await axios.get("standard_page/" + id);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getCmsPagesSlug = async () => {
  try {
    const response = await axios.get("standarddropmenu");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

