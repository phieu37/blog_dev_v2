
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put, takeLatest, call } from "redux-saga/effects"
import { setTitlePage } from "../app"
import { getListAuthor } from "../../../api/author"
import {
  setErrorCreateOrUpdateAuthor,
  setVisibleModalCreateOrUpdateAuthor,
  setVisibleModalDeleteAuthor,
  createAuthorFail,
  createAuthorSuccess,
  updateAuthorFail,
  updateAuthorSuccess,
  deleteAuthorFail,
  deleteAuthorSuccess,
} from "./index"
import { getNotification } from "../../../utils/helper"
import _ from "lodash"

function* loadRouteData() {
  yield put(setTitlePage("Quản lý tác giả"))
  // yield put(getListAuthor());
}

function* handleActions() {
  yield takeLatest(createAuthorSuccess, function* () {
    getNotification("success", "Tạo mới tác giả thành công")
    yield put(setVisibleModalCreateOrUpdateAuthor(false))
    yield put(getListAuthor());
  })

  yield takeLatest(createAuthorFail, function* (action) {
    // console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateAuthor({
          avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          bio: _.get(errors, "bio", ""),
          birthday: _.get(errors, "birthday", ""),
          status: _.get(errors, "status", ""),
          certificate: _.get(errors, "certificate", ""),
          date: _.get(errors, "date", ""),
        })
      )
    }
    getNotification("error", "Tạo mới thất bại")
  })

  yield takeLatest(updateAuthorSuccess, function* () {
    getNotification("success", "Cập nhật tác giả thành công")
    yield put(setVisibleModalCreateOrUpdateAuthor(false))
    yield put(getListAuthor())
  })

  yield takeLatest(updateAuthorFail, function* (action) {
    console.log('🚀 ~ yieldtakeLatest ~ action:', action)
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateAuthor({
          avatar: _.get(errors, "avatar", ""),
          name: _.get(errors, "name", ""),
          bio: _.get(errors, "bio", ""),
          birthday: _.get(errors, "birthday", ""),
          status: _.get(errors, "status", ""),
          certificate: _.get(errors, "certificate", ""),
          date: _.get(errors, "date", ""),
        })
      )
    }
    getNotification("error", "Cập nhật tác giả thất bại")
  })

  yield takeLatest(deleteAuthorSuccess, function* () {
    getNotification("success", "Xóa tác giả thành công")
    yield put(setVisibleModalDeleteAuthor(false))
    yield put(getListAuthor())
  })

  yield takeLatest(deleteAuthorFail, function* () {
    yield call(getNotification, "error", "Lỗi xóa tác giả.")
  })
}

export default function* loadAuthorSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
