import callApi from "../callApi"
import {
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
  // getAllRole,
  // getAllRoleSuccess,
  // getAllRoleFail,
  createUser,
  createUserSuccess,
  createUserFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
  startRequestResetPassword,
  requestResetPasswordSuccess,
  requestResetPasswordFail,
  startRequestChangeStatus,
  requestChangeStatusSuccess,
  requestChangeStatusFail
} from "../../states/modules/user"

// Tạo các action 
export const getListUser = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
  let path = `admin-management?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`
  }

  // if (dataFilter.status && dataFilter.status.length > 0) {
  //   path += `&status=${dataFilter.status}`
  // }

  if (dataFilter.order && dataFilter.column) {
    path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`
  }

  return callApi({
    method: "get",
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState,
  })
}

// export const getListUser = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
//   let path = `users?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

//   if (dataFilter.keySearch) {
//     path += `&q=${dataFilter.keySearch}`
//   }

//   // if (dataFilter.status && dataFilter.status.length > 0) {
//   //   path += `&status=${dataFilter.status}`
//   // }

//   if (dataFilter.order && dataFilter.column) {
//     path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`
//   }

//   return callApi({
//     method: "get",
//     apiPath: path,
//     actionTypes: [getList, getListSuccess, getListFail],
//     variables: {},
//     dispatch,
//     getState,
//   })
// }

export const getTotalUsers = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `admin-management/totalUsers`,
    actionTypes: [getTotal, getTotalSuccess, getTotalFail],
    variables: {},
    dispatch,
    getState,
  })
}

// export const getAllRoleForUser = () => async (dispatch, getState) => {
//   return callApi({
//     method: "get",
//     apiPath: `users`,
//     actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
//     variables: {},
//     dispatch,
//     getState,
//   })
// }

export const handleCreateUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `admin-management`,
    actionTypes: [createUser, createUserSuccess, createUserFail],
    // variables: data,
    variables: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      status: data.status,
    },
    dispatch,
    getState,
  })
}

export const handleUpdateUser = (data, idUser) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `admin-management/${idUser}`,
    actionTypes: [updateUser, updateUserSuccess, updateUserFail],
    // variables: data,
    variables: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status,
    },
    dispatch,
    getState,
  })
}

export const handleDeleteUser = (idUser) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `admin-management/${idUser}`,
    actionTypes: [deleteUser, deleteUserSuccess, deleteUserFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const changeStatusUser = (idUser, userStatus) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin-management/${idUser}/change-status`,
    actionTypes: [startRequestChangeStatus, requestChangeStatusSuccess, requestChangeStatusFail],
    variables: {
      status: userStatus
    },
    dispatch,
    getState
  })
}

export const resetPasswordUser = (idUser, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin-management/${idUser}/change-password`,
    actionTypes: [startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail],
    // variables: data,
    variables: {
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    dispatch,
    getState
  })
}