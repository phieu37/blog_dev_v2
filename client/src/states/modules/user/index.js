import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoadingTableUser: false,
    totalUsers:{
      total: 0
    },
    paginationListUser: {
      currentPage: 1,
      perPage: 5,
      totalPage: 1,
    },
    allRole: [],
    visibleModalCreateOrUpdateUser: false,
    isLoadingBtnCreateOrUpdateUser: false,
    errorCreateOrUpdateUser: {
      name: "",
      email: "",
      phone: "",
      password: "",
      avatar: "",
      confirmPassword: "",
    },
    visibleModalDeleteUser: false,
    isLoadingBtnDeleteUser: false,
  },
  reducers: {
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
    getList: (state) => ({
      ...state,
      users: [],
      isLoadingTableUser: true,
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableUser: false,
      users: action.payload.data.users,
      paginationListUser: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      users: [],
      isLoadingTableUser: false,
    }),

    getTotal: (state) => ({
      ...state,
      isLoadingTableUser: true,
    }),
    getTotalSuccess: (state, action) => ({
      ...state,
      isLoadingTableUser: false,
      totalUsers: {
        total: action.payload.data.total,
      },
    }),
    getTotalFail: (state) => ({
      ...state,
      isLoadingTableUser: false,
    }),

    getAllRole: (state) => ({ ...state }),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({ ...state }),
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
    deleteUser: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: true,
    }),
    deleteUserSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: false,
    }),
    deleteUserFail: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: false,
    }),
  },
})

export const {
  setErrorCreateOrUpdateUser,
  setVisibleModalDeleteUser,
  setVisibleModalCreateOrUpdateUser,
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
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
} = userSlice.actions

export default userSlice.reducer
