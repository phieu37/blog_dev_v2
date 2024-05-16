import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoadingTablePost: false,
    paginationListPost: {
      page: 1,
      perPage: 10,
      totalPage: 1,
    },
    visibleModalCreateOrUpdatePost: false,
    isLoadingBtnCreateOrUpdatePost: false,
    errorCreateOrUpdatePost: {
      title: "",
      content: "",
      thumbnail: "",
      author_id: null,
      category_ids: []
    },
    visibleModalDeletePost: false,
    isLoadingBtnDeletePost: false,
  },
  reducers: {
    setErrorCreateOrUpdatePost: (state, action) => ({
      ...state,
      errorCreateOrUpdatePost: action.payload,
    }),
    setVisibleModalCreateOrUpdatePost: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdatePost: action.payload,
    }),
    setVisibleModalDeletePost: (state, action) => ({
      ...state,
      visibleModalDeletePost: action.payload,
    }),
    getList: (state) => ({
      ...state,
      posts: [],
      isLoadingTablePost: true,
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTablePost: false,
      posts: action.payload.data.posts,
      paginationListPost: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      posts: [],
      isLoadingTablePost: false,
    }),
    getAllRole: (state) => ({ ...state }),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({ ...state }),
    createPost: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: true,
    }),
    createPostSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: false,
    }),
    createPostFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: false,
    }),
    updatePost: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: true,
    }),
    updatePostSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: false,
    }),
    updatePostFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdatePost: false,
    }),
    deletePost: (state) => ({
      ...state,
      isLoadingBtnDeletePost: true,
    }),
    deletePostSuccess: (state) => ({
      ...state,
      isLoadingBtnDeletePost: false,
    }),
    deletePostFail: (state) => ({
      ...state,
      isLoadingBtnDeletePost: false,
    }),
  },
})

export const {
  setErrorCreateOrUpdatePost,
  setVisibleModalDeletePost,
  setVisibleModalCreateOrUpdatePost,
  getList,
  getListSuccess,
  getListFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createPost,
  createPostSuccess,
  createPostFail,
  updatePost,
  updatePostSuccess,
  updatePostFail,
  deletePost,
  deletePostSuccess,
  deletePostFail,
  setCertificateError,
} = postSlice.actions

export default postSlice.reducer
