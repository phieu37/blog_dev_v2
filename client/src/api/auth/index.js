import callApi from "../callApi";
import {
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,
  startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `admin/auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `admin/auth/me`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const register = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/register`,
    actionTypes: [startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail],
    variables: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: data.address,
    },
    dispatch,
    getState
  })
}
