import callApi from "../callApi"
import {
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
  createPost,
  createPostSuccess,
  createPostFail,
  updatePost,
  updatePostSuccess,
  updatePostFail,
  deletePost,
  deletePostSuccess,
  deletePostFail,
} from "../../states/modules/post"
import { getDetailPost, getDetailPostSuccess, getDetailPostFail } from "../../states/modules/post-detail"

// Tạo các action 
export const getListPost = (dataFilter = { perPage: 5, page: 1 }) => async (dispatch, getState) => {
  let path = `posts?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&sort_order=${dataFilter.order}&column=${dataFilter.column}`
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

export const getTotalPosts = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `posts/totalPosts`,
    actionTypes: [getTotal, getTotalSuccess, getTotalFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleCreatePost = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `posts`,
    actionTypes: [createPost, createPostSuccess, createPostFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleUpdatePost = (data, idPost) => async (dispatch, getState) => {
  return callApi({
    method: "put",
    apiPath: `posts/${idPost}`,
    actionTypes: [updatePost, updatePostSuccess, updatePostFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const handleGetPostDetail = (idPost) => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `posts/${idPost}`,
    actionTypes: [getDetailPost, getDetailPostSuccess, getDetailPostFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleDeletePost = (idPost) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `posts/${idPost}`,
    actionTypes: [deletePost, deletePostSuccess, deletePostFail],
    variables: {},
    dispatch,
    getState,
  })
}
