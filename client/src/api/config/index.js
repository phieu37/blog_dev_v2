import {
  getInfoBankFailure,
  getInfoBankSuccess,
  getInfoBanks,
  getInfoLarkFailure,
  getInfoLarkSuccess,
  getInfoLarks,
  getInfoOtp,
  getInfoOtpFailure,
  getInfoOtpSuccess,
  updateInfoBank,
  updateInfoBankFailure,
  updateInfoBankSuccess,
  updateInfoLark,
  updateInfoLarkFailure,
  updateInfoLarkSuccess,
  updateInfoSMS,
  updateInfoSMSFailure,
  updateInfoSMSSuccess,
} from "../../states/modules/config";
import callApi from "../callApi";

export const handleGetInfoLarks = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: "/admin/config/lark",
    actionTypes: [
      getInfoLarks, 
      getInfoLarkSuccess, 
      getInfoLarkFailure, 
    ],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleUpdateInfoLarks = (data) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: "/admin/config/lark",
    actionTypes: [
      updateInfoLark, 
      updateInfoLarkSuccess, 
      updateInfoLarkFailure
    ],
    variables: data,
    dispatch,
    getState,
  });
};

export const handleGetInfoBanks = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: "/admin/config/bank",
    actionTypes: [
      getInfoBanks, 
      getInfoBankSuccess, 
      getInfoBankFailure
    ],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleUpdateInfoBanks = (data) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: "admin/config/bank",
    actionTypes: [
      updateInfoBank, 
      updateInfoBankSuccess, 
      updateInfoBankFailure
    ],
    variables: data,
    dispatch,
    getState,
  });
};

export const handleGetInfoOtp = () => async (dispatch, getState) => {
    return callApi({
      method: "get",
      apiPath: "/admin/config/otp",
      actionTypes: [
        getInfoOtp, 
        getInfoOtpSuccess, 
        getInfoOtpFailure, 
      ],
      variables: {},
      dispatch,
      getState,
    });
  };

export const handleUpdateInfoOtp = (data) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: "admin/config/otp",
    actionTypes: [
      updateInfoSMS, 
      updateInfoSMSSuccess, 
      updateInfoSMSFailure
    ],
    variables: data,
    dispatch,
    getState,
  });
};
