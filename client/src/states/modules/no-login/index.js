import { createSlice } from "@reduxjs/toolkit";

const noLoginSlice = createSlice({
  name: 'noLogin',
  initialState: {
    value: 'Set value',
  },
  reducers: {
    setValue: (state, action) => ({
      ...state,
      value: action.payload
    })
  }
})

export const {
  setValue
} = noLoginSlice.actions

export default noLoginSlice.reducer;
