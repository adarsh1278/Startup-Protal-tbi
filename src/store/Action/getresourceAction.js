'use client';
import axios from 'axios';
import TYPES from '../constant';
import { Resource_Detail } from '../../../APiEndPoints/ApiEndPoints';
import { getHeaders } from '@/utils/authHeaders';
import toast from 'react-hot-toast';


const getTokens = () => {
  if (typeof window !== 'undefined') {
    return {
      refreshToken: localStorage.getItem('refreshTokenFounder'),
      accessToken: localStorage.getItem('accessTokenFounder'),
    };
  }
  return { refreshToken: null, accessToken: null };
};

// Fetch Resource Details
export const getResourceDetails = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.Resource_Detail });

      const { refreshToken, accessToken } = getTokens();

      if (!refreshToken || !accessToken) {
        console.warn('Tokens missing in localStorage');
        return dispatch({
          type: TYPES.Resource_Detail_FAILURE,
          payload: 'Authentication tokens are missing.',
        });
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Resource_Detail}`,
        {
          headers: {
            Refresh: refreshToken,
            Access: accessToken,
          },
          withCredentials: true,
        }
      );

      if (Boolean(response?.data?.success)) {
        dispatch({
          type: TYPES.Resource_Detail_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: TYPES.Resource_Detail_FAILURE,
          payload: response?.data?.message || 'Failed to fetch resource details.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({
        type: TYPES.Resource_Detail_FAILURE,
        payload: error?.response?.data?.message || 'An error occurred.',
      });
    }
  };
};


export const requestResource = (resourceId, requestedQuantity) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.REQUEST_RESOURCE_LOADING });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestResources`,
        { resourceId, requestedQuantity },
        {
          headers: getHeaders(),
          withCredentials: true,
        }
      );

      if (Boolean(response?.data?.success)) {
        dispatch({ type: TYPES.REQUEST_RESOURCE_SUCCESS });
        toast.success('Resource request submitted successfully!');
      } else {
        const errorMessage = response?.data?.message || 'Failed to request resource';
        dispatch({ type: TYPES.REQUEST_RESOURCE_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while requesting the resource.';
      dispatch({ type: TYPES.REQUEST_RESOURCE_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
