
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put, takeLatest, call } from "redux-saga/effects"
import { setTitlePage } from "../app"
import { 
  // getAllRoleForUser, 
  getListUser } from "../../../api/user"
import {
  setErrorCreateOrUpdateUser,
  setVisibleModalCreateOrUpdateUser,
  setVisibleModalDeleteUser,
  createUserFail,
  createUserSuccess,
  updateUserFail,
  updateUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
  setVisibleModalChangeStatus,
  requestChangeStatusSuccess,
  requestChangeStatusFail,
  requestResetPasswordSuccess,
  setVisibleModalChangePassword,
} from "./index"
import { getNotification } from "../../../utils/helper"
import _ from "lodash"

function* loadRouteData() {
  yield put(setTitlePage("Quản lý tài khoản"))
  // yield put(getAllRoleForUser())
  // yield put(getListUser())
}

function* handleActions() {
  yield takeLatest(createUserSuccess, function* () {
    getNotification("success", "Tạo mới người dùng thành công")
    yield put(setVisibleModalCreateOrUpdateUser(false))
    yield put(getListUser());
  })

  yield takeLatest(createUserFail, function* (action) {
    // console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(setErrorCreateOrUpdateUser({
          // avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          email: _.get(errors, "email", ""),
          phone: _.get(errors, "phone", ""),
          password: _.get(errors, "password", ""),
          status: _.get(errors,'status',''),
        }))
    }
    getNotification("errors", "Tạo mới người dùng thất bại")
  })

  yield takeLatest(updateUserSuccess, function* () {
    getNotification("success", "Cập nhật người dùng thành công")
    yield put(setVisibleModalCreateOrUpdateUser(false))
    yield put(getListUser())
  })

  yield takeLatest(updateUserFail, function* (action) {
    // console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(setErrorCreateOrUpdateUser({
          // avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          email: _.get(errors, "email", ""),
          phone: _.get(errors, "phone", ""),
          status: _.get(errors,'status',''),
        }))
    }
    getNotification("errors", "Cập nhật thất bại")
  })

  yield takeLatest(requestResetPasswordSuccess, function* () {
    yield call(getNotification, 'Thành công', 'Cập nhật mật khẩu thành công!');
    yield put(setVisibleModalChangePassword(false))
  });

  yield takeLatest(deleteUserSuccess, function* () {
    getNotification("success", "Xóa người dùng thành công")
    yield put(setVisibleModalDeleteUser(false))
    yield put(getListUser())
  })

  yield takeLatest(deleteUserFail, function* () {
    yield call(getNotification, "Lỗi", "Lỗi xóa người dùng.")
  })

  yield takeLatest(requestChangeStatusSuccess, function* () {
    getNotification("success", "Thay đổi trạng thái thành công")
    yield put(setVisibleModalChangeStatus(false))
    yield put(getListUser())
  })

  yield takeLatest(requestChangeStatusFail, function* () {
    yield call(getNotification ,'errors', 'Lỗi thay đổi trạng thái');
  });

}

export default function* loadUserSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
