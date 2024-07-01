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
    goToPage: {
      path: "",
      redirected: true
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
    }),
    goToPage: (state, action) => {
      // console.log('🚀 ~ state, action:', state, action)
      return (
        {
          ...state,
          goToPage: {
            path: action.payload.path,
            redirected: false
          }
        }
      )
    },
    // goToPage: (state, action) => ({
    //   ...state,
    //   goToPage: {
    //     path: action.payload.path,
    //     redirected: false
    //   }
    // }),
    goToPageSuccess: (state) => ({
      ...state,
      goToPage: {
        ...state.goToPage,
        redirected: true
      }
    })
  }
})

export const {
  goToPage,
  goToPageSuccess,
  handleSetIsShowSideBar,
  setTitlePage,
  setLocation,
  startRequest, requestSuccess, requestError
} = appSlice.actions

export default appSlice.reducer;
