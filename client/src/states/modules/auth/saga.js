import { all, fork, takeLatest, put } from "redux-saga/effects"
import { startRequestLoginFail, startRequestLoginSuccess, startRequestRegisterFail, startRequestRegisterSuccess } from "./index"
import { setAuthToken } from "../../../utils/localStorage"
import { getMe } from "../../../api/auth"
import { setLocation } from "../app"
import { getNotification } from "../../../utils/helper"

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestRegisterSuccess, function* (action) {
    getNotification("success", "Register success")
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(setLocation({ pathName: "/home" }))
    yield
  })

  yield takeLatest(startRequestRegisterFail, function* () {
    getNotification("error", "Register fail")
    yield
  })

  yield takeLatest(startRequestLoginSuccess, function* (action) {
    getNotification("success", "Login success")
    let token = action.payload.data.access_token
    setAuthToken(token)
    yield put(getMe())
  })

  yield takeLatest(startRequestLoginFail, function (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      getNotification("error", "Login fail, wrong password or email")
      // let errors = action.payload.data.errors
      // yield put(setErrorLogin({
      //   email: _.get(errors,'email[0]',''),
      //   password: _.get(errors,'password[0]','')
      // }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin email hoặc mật khẩu không chính xác.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  })
}

export default function* loadAuthSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
