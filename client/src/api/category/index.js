import callApi from "../callApi"
import {
  getList,
  getListSuccess,
  getListFail,
  createCategory,
  createCategorySuccess,
  createCategoryFail,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "../../states/modules/category"
import { getDetailCategory, getDetailCategoryFail, getDetailCategorySuccess } from "../../states/modules/category-detail"

// Tạo các action 
export const getListCategory = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
  let path = `categories?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`
  }
// export const getListCategory = () => async (dispatch, getState) => {
//   const dataFilter = getState().category.dataFilter
//   let path = `categories`;
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

export const handleCreateCategory = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `categories`,
    actionTypes: [createCategory, createCategorySuccess, createCategoryFail],
    variables: {
      name: data.name,
      description: data.description,
    },
    dispatch,
    getState,
  })
}

export const handleUpdateCategory = (data, idCategory) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `categories/${idCategory}`,
    actionTypes: [updateCategory, updateCategorySuccess, updateCategoryFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleGetCategoryDetail = (idCategory) => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `categories/${idCategory}`,
    actionTypes: [getDetailCategory, getDetailCategorySuccess, getDetailCategoryFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleDeleteCategory = (idCategory) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `categories/${idCategory}`,
    actionTypes: [deleteCategory, deleteCategorySuccess, deleteCategoryFail],
    variables: {},
    dispatch,
    getState,
  })
}
