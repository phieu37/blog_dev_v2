import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isShowSideBar: true,
    isThemeLight: false,
    title: 'Dashboard',
    location: {
      pathName: '',
      payload: {},
      prevPathName: ''
    },
  },
  reducers: {
    startRequest: (state) => ({
      ...state,
      list: null
    }),
    requestSuccess: (state, action) => ({
      ...state,
      list: action.payload
    }),
    requestError: (state) => ({
      ...state,
      list: 'sdsd'
    }),
    handleSetIsShowSideBar: (state, action) => ({
      ...state,
      isShowSideBar: action.payload
    }),
    setTitlePage: (state, action) => ({
      ...state,
      title: action.payload
    }),
    setLocation: (state, action) => ({
      ...state,
      location: {
        pathName: action.payload.pathName,
        prevPathName: action.payload.prevPathName || null,
        payload: action.payload.payload || {},
      }
    })
  }
})

export const {
  handleSetIsShowSideBar,
  setTitlePage,
  setLocation,
  startRequest, requestSuccess, requestError
} = appSlice.actions

export default appSlice.reducer;
