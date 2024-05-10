import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
  isLoadingUsers: false,
  pagination: {
    totalRecord: 0,
    currentPage: 1,
    perPage: 20,
  },
  dataFilter: {
    q: "",
    page: 1,
    per_page: 20,
    sort_order: null,
    field: null,
  },
  visibleModalCreateOrUpdateUser: false,
  isLoadingBtnCreateOrUpdateUser: false,
  errorCreateOrUpdateUser: {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  },
  visibleModalDeleteUser: false,
  isLoadingBtnDeleteUser: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getListUsers: (state) => ({
      ...state,
      isLoadingUsers: true,
    }),
    getListUsersSuccess: (state, action) => ({
      ...state,
      users: action.payload.data.users,
      pagination: {
        totalRecord: action.payload.data.total,
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
      },
      isLoadingUsers: false,
    }),
    getListUsersFail: (state) => ({
      ...state,
      isLoadingUsers: false,
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    resetState: () => initialState,
    createUser: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: true,
    }),
    createUserSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: false,
    }),
    createUserFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: false,
    }),
    updateUser: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: true,
    }),
    updateUserSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: false,
    }),
    updateUserFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUser: false,
    }),
    setErrorCreateOrUpdateUser: (state, action) => ({
      ...state,
      errorCreateOrUpdateUser: action.payload,
    }),
    setVisibleModalCreateOrUpdateUser: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateUser: action.payload,
    }),
    setVisibleModalDeleteUser: (state, action) => ({
      ...state,
      visibleModalDeleteUser: action.payload,
    }),
  },
})

export const {
  getListUsers,
  getListUsersSuccess,
  getListUsersFail,
  setDataFilter,
  resetState,
  setVisibleModalCreateOrUpdateUser,
  setErrorCreateOrUpdateUser,
  setVisibleModalDeleteUser,
} = userSlice.actions

export default userSlice.reducer
