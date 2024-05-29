import { createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoadingTableCategory: false,
    totalCategories:{
      total: 0
    },
    paginationListCategory: {
      page: 1,
      perPage: 10,
      totalPage: 1,
    },
    visibleModalCreateOrUpdateCategory: false,
    isLoadingBtnCreateOrUpdateCategory: false,
    errorCreateOrUpdateCategory: {
      name: "",
      description: "",
    },
    visibleModalDeleteCategory: false,
    isLoadingBtnDeleteCategory: false,
  },
  reducers: {
    setErrorCreateOrUpdateCategory: (state, action) => ({
      ...state,
      errorCreateOrUpdateCategory: action.payload,
    }),
    setVisibleModalCreateOrUpdateCategory: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCategory: action.payload,
    }),
    setVisibleModalDeleteCategory: (state, action) => ({
      ...state,
      visibleModalDeleteCategory: action.payload,
    }),
    getList: (state) => ({
      ...state,
      categories: [],
      isLoadingTableCategory: true,
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableCategory: false,
      categories: action.payload.data.categories,
      paginationListCategory: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      categories: [],
      isLoadingTableCategory: false,
    }),

    getTotal: (state) => ({
      ...state,
      isLoadingTableCategory: true,
    }),
    getTotalSuccess: (state, action) => ({
      ...state,
      isLoadingTableCategory: false,
      totalCategories: {
        total: action.payload.data.total,
      },
    }),
    getTotalFail: (state) => ({
      ...state,
      isLoadingTableCategory: false,
    }),

    getAllRole: (state) => ({ ...state }),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({ ...state }),
    createCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true,
    }),
    createCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false,
    }),
    createCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false,
    }),
    updateCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true,
    }),
    updateCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false,
    }),
    updateCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false,
    }),
    deleteCategory: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: true,
    }),
    deleteCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false,
    }),
    deleteCategoryFail: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false,
    }),
  },
})

export const {
  setErrorCreateOrUpdateCategory,
  setVisibleModalDeleteCategory,
  setVisibleModalCreateOrUpdateCategory,
  getList,
  getListSuccess,
  getListFail,
  getTotal,
  getTotalSuccess,
  getTotalFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createCategory,
  createCategorySuccess,
  createCategoryFail,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail,
  setCertificateError,
} = categorySlice.actions

export default categorySlice.reducer
