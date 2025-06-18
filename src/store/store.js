import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import changePasswordReducer from "./Reducer/ChangePasswordReducer";
import forgotPasswordReducer from "./Reducer/ForgotPasswordReducer";
import RefreshAccessTokenReducer from './Reducer/refreshAcessToken_Reducer';
import { getResourceReducer, requestResourceReducer } from './Reducer/Reducergetresource';
import    getFounderDetalsReducer from './Reducer/Get_Founder_Details_Reducer'
import  { requestMentorSessionReducer } from './Reducer/Request_mentoring_Reducer'
import {fetchAllMentorsReducer} from './Reducer/Fetch_All_Mentor_Reducer'
import {requestOfficeSpaceReducer} from './Reducer/Request_Office_Space_Reducer';
import { requestReducer } from "./Reducer/Fetch_All_Request_Reducer";
import { fetchAllMentorshipRequestsReducer} from './Reducer/Fetch_All_Mentorship_Request_Reducer';
import {uploadDocReducer} from "./Reducer/Upload_Doc_Reducer";
import {fetchRequestedDocsReducer} from "./Reducer/Fetch_All_Doc_Reducer";
import chatReducer from './Reducer/chatReducer';




const rootReducer = combineReducers({
  token: RefreshAccessTokenReducer,
  resource: getResourceReducer,
  requestResource: requestResourceReducer,
  founderDetails:  getFounderDetalsReducer ,  
  requestMentorSession: requestMentorSessionReducer,
  fetchAllMentors: fetchAllMentorsReducer,
  requestOfficeSpace: requestOfficeSpaceReducer,
  requestData: requestReducer,
  mentorshipRequests: fetchAllMentorshipRequestsReducer,
  uploadDocument: uploadDocReducer,
  requestedDocs: fetchRequestedDocsReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
