
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
} from "./index"
import { getNotification } from "../../../utils/helper"
import _ from "lodash"

function* loadRouteData() {
  yield put(setTitlePage("User Management"))
  // yield put(getAllRoleForUser())
  // yield put(getListUser())
}

function* handleActions() {
  yield takeLatest(createUserSuccess, function* () {
    getNotification("success", "Create user success")
    yield put(setVisibleModalCreateOrUpdateUser(false))
    yield put(getListUser());
  })

  yield takeLatest(createUserFail, function* (action) {
    console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateUser({
          avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          email: _.get(errors, "email", ""),
          phone: _.get(errors, "phone", ""),
          password: _.get(errors, "password", ""),
        })
      )
    }
    getNotification("error", "Create user fail")
  })

  yield takeLatest(updateUserSuccess, function* () {
    getNotification("success", "Update user success")
    yield put(setVisibleModalCreateOrUpdateUser(false))
    yield put(getListUser())
  })

  yield takeLatest(updateUserFail, function* (action) {
    console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateUser({
          avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          email: _.get(errors, "email", ""),
          phone: _.get(errors, "phone", ""),
        })
      )
    }
    getNotification("error", "Update user fail")
  })

  yield takeLatest(deleteUserSuccess, function* () {
    getNotification("success", "Delete user success")
    yield put(setVisibleModalDeleteUser(false))
    yield put(getListUser())
  })

  yield takeLatest(deleteUserFail, function* () {
    yield call(getNotification, "error", "Failed to delete user.")
  })
}

export default function* loadUserSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
