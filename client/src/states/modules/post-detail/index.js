import { createSlice } from "@reduxjs/toolkit"

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState: {
  postDetail : null,
  isLoadingPostDetail: false
  },
  reducers: {
    getDetailPost: (state) => ({
      ...state,
      isLoadingPostDetail: true,
    }),
    getDetailPostSuccess: (state, action) => ({
      ...state,
      isLoadingPostDetail: false,
      postDetail: action.payload.data
    }),
    getDetailPostFail: (state) => ({
      ...state,
      postDetail: null,
      isLoadingPostDetail: false,
    }),
  },
})

export const {
  getDetailPost,
  getDetailPostSuccess,
  getDetailPostFail
} = postDetailSlice.actions

export default postDetailSlice.reducer
