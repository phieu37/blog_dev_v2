import { createSlice } from "@reduxjs/toolkit"

const authorSlice = createSlice({
  name: "author",
  initialState: {
    authors: [],
    isLoadingTableAuthor: false,
    totalAuthors:{
      total: 0
    },
    paginationListAuthor: {
      page: 1,
      perPage: 10,
      totalPage: 1,
    },
    visibleModalCreateOrUpdateAuthor: false,
    isLoadingBtnCreateOrUpdateAuthor: false,
    errorCreateOrUpdateAuthor: {
      name: "",
      email: "",
      bio: "",
      birthday: "",
      status: "",
      certificate: "",
      date: "",
      avatar: "",
    },
    visibleModalDeleteAuthor: false,
    isLoadingBtnDeleteAuthor: false,
  },
  reducers: {
    setErrorCreateOrUpdateAuthor: (state, action) => ({
      ...state,
      errorCreateOrUpdateAuthor: action.payload,
    }),
    setVisibleModalCreateOrUpdateAuthor: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateAuthor: action.payload,
    }),
    setVisibleModalDeleteAuthor: (state, action) => ({
      ...state,
      visibleModalDeleteAuthor: action.payload,
    }),
    getList: (state) => ({
      ...state,
      authors: [],
      isLoadingTableAuthor: true,
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableAuthor: false,
      authors: action.payload.data.authors,
      paginationListAuthor: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      authors: [],
      isLoadingTableAuthor: false,
    }),

    getTotal: (state) => ({
      ...state,
      isLoadingTableAuthor: true,
    }),
    getTotalSuccess: (state, action) => ({
      ...state,
      isLoadingTableAuthor: false,
      totalAuthors: {
        total: action.payload.data.total,
      },
    }),
    getTotalFail: (state) => ({
      ...state,
      isLoadingTableAuthor: false,
    }),

    getAllRole: (state) => ({ ...state }),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({ ...state }),
    createAuthor: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: true,
    }),
    createAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false,
    }),
    createAuthorFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false,
    }),
    updateAuthor: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: true,
    }),
    updateAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false,
    }),
    updateAuthorFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false,
    }),
    deleteAuthor: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: true,
    }),
    deleteAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: false,
    }),
    deleteAuthorFail: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: false,
    }),
  },
})

export const {
  setErrorCreateOrUpdateAuthor,
  setVisibleModalDeleteAuthor,
  setVisibleModalCreateOrUpdateAuthor,
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createAuthor,
  createAuthorSuccess,
  createAuthorFail,
  updateAuthor,
  updateAuthorSuccess,
  updateAuthorFail,
  deleteAuthor,
  deleteAuthorSuccess,
  deleteAuthorFail,
  setCertificateError,
} = authorSlice.actions

export default authorSlice.reducer
