import callApi from "../callApi"
import {
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
  createAuthor,
  createAuthorSuccess,
  createAuthorFail,
  updateAuthor,
  updateAuthorSuccess,
  updateAuthorFail,
  deleteAuthor,
  deleteAuthorSuccess,
  deleteAuthorFail,
} from "../../states/modules/author"

// Tạo các action 
export const getListAuthor = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
    let path = `authors?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

    if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`
    }

// export const getListAuthor = (dataFilter) => async (dispatch, getState) => {
//   let path = `authors`;
//   if (dataFilter && dataFilter.perPage && dataFilter.page) {
//     path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

//     if (dataFilter.keySearch) {
//       path += `&q=${dataFilter.keySearch}`;
//     }

//     if (dataFilter.order && dataFilter.column) {
//       path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
//     }
//   }

  return callApi({
    method: "get",
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const getTotalAuthors = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `authors/totalAuthors`,
    actionTypes: [getTotal, getTotalSuccess, getTotalFail],
    variables: {},
    dispatch,
    getState,
  })
}

// export const getAllRoleForAuthor = () => async (dispatch, getState) => {
//   return callApi({
//     method: "get",
//     apiPath: `authors`,
//     actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
//     variables: {},
//     dispatch,
//     getState,
//   })
// }

export const handleCreateAuthor = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `authors`,
    actionTypes: [createAuthor, createAuthorSuccess, createAuthorFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleUpdateAuthor = (data, idAuthor) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `authors/${idAuthor}`,
    actionTypes: [updateAuthor, updateAuthorSuccess, updateAuthorFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleDeleteAuthor = (idAuthor) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `authors/${idAuthor}`,
    actionTypes: [deleteAuthor, deleteAuthorSuccess, deleteAuthorFail],
    variables: {},
    dispatch,
    getState,
  })
}
