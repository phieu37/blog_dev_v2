import { all, fork, takeLatest, put } from "redux-saga/effects"
import { startRequestLoginFail, startRequestLoginSuccess, startRequestRegisterFail, startRequestRegisterSuccess } from "./index"
import { setAuthToken } from "../../../utils/localStorage"
import { goToPage, setLocation } from "../app"
import { getNotification } from "../../../utils/helper"

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestRegisterSuccess, function* (action) {
    getNotification("success", "Đăng kí thành công")
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(setLocation({ pathName: "/home" }))
  })

  yield takeLatest(startRequestRegisterFail, function () {
    getNotification("error", "Đăng kí thất bại")
  })

  yield takeLatest(startRequestLoginSuccess, function* (action) {
    getNotification("success", "Đăng nhập thành công")
    let token = action.payload.data.access_token
    setAuthToken(token)
    yield put(goToPage({path: "/home"}))
  })

  yield takeLatest(startRequestLoginFail, function (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      getNotification("error", "Lỗi, vui lòng kiểm tra email hoặc mật khẩu")
    } else if (statusError === 401) {
      getNotification("error", 'Thông tin email hoặc mật khẩu không chính xác.');
    } else {
      getNotification("error", 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  })

}

export default function* loadAuthSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
