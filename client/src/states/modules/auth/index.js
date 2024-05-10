import { createSlice } from "@reduxjs/toolkit"

// quản lý một phần trạng thái của ứng dụng liên quan đến việc xác thực
const authSlice = createSlice({
  // slice được tạo sẽ có tên là 'auth'
  name: "auth",
  // initialState là đối tượng mô tả trạng thái ban đầu của slice
  initialState: {
    isAuthSuccess: false, // không có người dùng nào được xác thực
    authUser: {}, // không có thông tin user nào được lưu
    authAuthor: {}, // không có thông tin author nào được lưu
    errorRegister: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      // avatar: "",
    },
    isLoadingBtnLogin: false,
    isLoadingBtnRegister: false,
  },
  // reducers được định nghĩa dưới dạng hàm, mỗi hàm sẽ xử lý một/nhiều hành động và
  // trả về một trạng thái mới cho slice
  reducers: {
    // 3 cái xử lý các hành động liên quan đến quá trình đăng nhập
    // thay đổi trạng thái của isLoadingBtnLogin để hiển thị trạng thái của nút đăng nhập
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true,
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false,
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false,
    }),
    // 3 cái xử lý các hành động liên quan đến việc lấy thông tin người dùng
    // để cập nhật trạng thái của người dùng đã xác thực và thông tin người dùng
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.data,
    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {},
    }),
    // 3 cái xử lý các hành động liên quan đến quá trình đăng ký
    // thay đổi trạng thái của isLoadingBtnRegister để hiển thị trạng thái của nút đăng ký
    startRequestRegister: (state) => ({
      ...state,
      isLoadingBtnRegister: true,
    }),
    startRequestRegisterSuccess: (state) => ({
      ...state,
      isLoadingBtnRegister: false,
    }),
    startRequestRegisterFail: (state) => ({
      ...state,
      isLoadingBtnRegister: false,
    }),
  },
})

// Xuất actions của slice để sử dụng trong việc dispatch các hành động từ các thành phần khác
export const {
  startRequestLogin,
  startRequestLoginSuccess,
  startRequestLoginFail,
  startRequestGetMe,
  startRequestGetMeSuccess,
  startRequestGetMeFail,
  startRequestRegister,
  startRequestRegisterSuccess,
  startRequestRegisterFail,
} = authSlice.actions

// Xuất reducer của slice để nó kết hợp với các reducer khác của ứng dụng Redux sử dụng hàm combineReducers
export default authSlice.reducer
