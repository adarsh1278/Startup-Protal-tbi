import TYPES from "../constant";

const initialState = {
  loading: false,
  success: "",
  error: null,
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FORGOT_PASSWORD_LOADING:
    case TYPES.RESET_PASSWORD_LOADING:
      return { 
        ...state, 
        loading: true, 
        success: "", 
        error: null 
      };

    case TYPES.FORGOT_PASSWORD_SUCCESS:
    case TYPES.RESET_PASSWORD_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: action.payload,
        error: null
      };

    case TYPES.FORGOT_PASSWORD_FAILURE:
    case TYPES.RESET_PASSWORD_FAILURE:
      return { 
        ...state, 
        loading: false,
        success: "",
        error: action.payload 
      };

    case TYPES.FORGOT_PASSWORD_RESET:
      return initialState;

    default:
      return state;
  }
};

export default forgotPasswordReducer;
