import axios from "axios";
import TYPES from '../constant';

export const changePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.Change_Password_LOADING });

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/founder/changepassword`,
        passwordData,
        {
          withCredentials: true, 
        }
      );

      dispatch({
        type: TYPES.Change_Password_SUCCESS,
        payload: response.data.message || "Password changed successfully",
      });
    } catch (error) {
      dispatch({
        type: TYPES.Change_Password_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};
