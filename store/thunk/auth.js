import { getUserData } from "@actions";
import { userActions } from "@store/slices/auth";

export const handleGetUserData = () => async (dispatch) => {
  try {

    const response = await getUserData();
    if (!response.error) {
      dispatch(userActions.getUserInfo(response?.data))
    }
    else {
      dispatch(userActions.getUserInfo(null))

    }

  } catch (error) {
    dispatch(userActions.getUserInfo(null))
  }
}


export const handleClearUserData = () => async (dispatch) => {
  localStorage.removeItem("token")
  dispatch(userActions.clearUserData())

}


