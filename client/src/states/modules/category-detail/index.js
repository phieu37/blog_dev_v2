import { createSlice } from "@reduxjs/toolkit"

const categoryDetailSlice = createSlice({
  name: "categoryDetail",
  initialState: {
  categoryDetail : {},
  isLoadingCategoryDetail: false
  },
  reducers: {
    getDetailCategory: (state) => ({
      ...state,
      categoryDetail: [],
      isLoadingCategoryDetail: true,
    }),
    getDetailCategorySuccess: (state, action) => ({
      ...state,
      isLoadingCategoryDetail: false,
      categoryDetail: action.payload.data
    }),
    getDetailCategoryFail: (state) => ({
      ...state,
      categoryDetail: {},
      isLoadingCategoryDetail: false,
    }),
  },
})

export const {
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFail
} = categoryDetailSlice.actions

export default categoryDetailSlice.reducer
