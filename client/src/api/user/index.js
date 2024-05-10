import callApi from "../callApi"
import {
  getList,
  getListSuccess,
  getListFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createUser,
  createUserSuccess,
  createUserFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
} from "../../states/modules/user"

// Tạo các action 
export const getListUser = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
    let path = `users?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

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

export const getAllRoleForUser = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `users`,
    actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleCreateUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `users`,
    actionTypes: [createUser, createUserSuccess, createUserFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleUpdateUser = (data, idUser) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `users/${idUser}`,
    actionTypes: [updateUser, updateUserSuccess, updateUserFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleDeleteUser = (idUser) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `users/${idUser}`,
    actionTypes: [deleteUser, deleteUserSuccess, deleteUserFail],
    variables: {},
    dispatch,
    getState,
  })
}
