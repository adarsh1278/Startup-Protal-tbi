import axios from "axios";
import TYPES from '../constant';

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.FORGOT_PASSWORD_LOADING });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/founder/forgot-password`,
        { email },
        { withCredentials: true }
      );

      dispatch({
        type: TYPES.FORGOT_PASSWORD_SUCCESS,
        payload: response.data.message || "Password reset link sent to your email",
      });
      
      return { success: true, message: response.data.message };
    } catch (error) {
      dispatch({
        type: TYPES.FORGOT_PASSWORD_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
      
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };
};

export const resetPassword = (token, newPassword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.RESET_PASSWORD_LOADING });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/founder/reset-password`,
        { token, newPassword },
        { withCredentials: true }
      );

      dispatch({
        type: TYPES.RESET_PASSWORD_SUCCESS,
        payload: response.data.message || "Password has been reset successfully",
      });
      
      return { success: true, message: response.data.message };
    } catch (error) {
      dispatch({
        type: TYPES.RESET_PASSWORD_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
      
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };
};
