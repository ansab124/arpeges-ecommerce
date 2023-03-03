import axios from "@helper/apiHelper";


export const getFilteredPartitions = async (filters) => {
  try {
    const response = await axios.get("partitions", { params: filters });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getPartitionsFilters = async () => {
  try {
    const response = await axios.get("partition_filters");
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getPartitionProductDetails = async (slug) => {
  try {
    const response = await axios.get("product_partition_show/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getPartitionProductRelated = async (slug) => {
  try {
    const response = await axios.get("releated_partition_show/" + slug);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}
export const getPromotionPartitions = async (payload) => {
  try {
    const response = await axios.get("promotion_partitions", { params: payload });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


