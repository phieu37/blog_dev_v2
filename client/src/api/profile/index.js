import callApi from "../callApi"
import {
  changeAvatarFail,
  changeAvatarSuccess,
  changeAvatar,
  changePassword,
  changePasswordFail,
  changePasswordSuccess,
  updateInfoUser,
  updateInfoUserFail,
  updateInfoUserSuccess,
} from "../../states/modules/profile"

export const handleUpdateInfoUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `admin/auth/me`,
    actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
    variables: {
      name: data.name,
      phone: data.phone ? data.phone : ''
    },
    dispatch,
    getState,
  })
}

export const updateAvatarProfile = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `admin/auth/me/avatar`,
    actionTypes: [changeAvatar, changeAvatarSuccess, changeAvatarFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleChangePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: "patch",
    apiPath: `admin/auth/change-password`,
    actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
    // variables: data,
    // không dùng form data viết rõ biến cần truyền
    variables: {
      password: data.currentPassword,
      new_password: data.newPassword,
      password_confirmation: data.confirmPassword,
    },
    dispatch,
    getState,
  })
}
