import axios from "@helper/apiHelper";


export const getEditorAutoComplete = async (query) => {
  try {
    const response = await axios.get("editor_autocompelete", { params: { q: query } });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const getComposerAutoComplete = async (query) => {
  try {
    const response = await axios.get("composer_autocompelete", { params: { q: query } });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}