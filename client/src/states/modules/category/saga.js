
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put, takeLatest, call } from "redux-saga/effects"
import { setTitlePage } from "../app"
import { getListCategory } from "../../../api/category"
import {
  setErrorCreateOrUpdateCategory,
  setVisibleModalCreateOrUpdateCategory,
  setVisibleModalDeleteCategory,
  createCategoryFail,
  createCategorySuccess,
  updateCategoryFail,
  updateCategorySuccess,
  deleteCategoryFail,
  deleteCategorySuccess,
} from "./index"
import { getNotification } from "../../../utils/helper"
import _ from "lodash"

function* loadRouteData() {
  yield put(setTitlePage("Quản lý danh mục"))
}

function* handleActions() {
  yield takeLatest(createCategorySuccess, function* () {
    getNotification("success", "Tạo mới danh mục thành công")
    yield put(setVisibleModalCreateOrUpdateCategory(false))
    yield put(getListCategory());
  })

  yield takeLatest(createCategoryFail, function* (action) {
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateCategory({
          name: _.get(errors, "name", ""),
          description: _.get(errors, "description", ""),
        })
      )
    }
    getNotification("error", "Tạo mới danh mục thất bại")
  })

  yield takeLatest(updateCategorySuccess, function* () {
    getNotification("success", "Cập nhật danh mục thành công")
    yield put(setVisibleModalCreateOrUpdateCategory(false))
    yield put(getListCategory())
  })

  yield takeLatest(updateCategoryFail, function* (action) {
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdateCategory({
          name: _.get(errors, "name", ""),
          description: _.get(errors, "description", ""),
        })
      )
    }
    getNotification("error", "Cập nhật danh mục thất bại")
  })

  yield takeLatest(deleteCategorySuccess, function* () {
    getNotification("success", "Delete category success")
    yield put(setVisibleModalDeleteCategory(false))
    yield put(getListCategory())
  })

  yield takeLatest(deleteCategoryFail, function* () {
    yield call(getNotification, "error", "Lỗi xóa danh mục.")
  })
}

export default function* loadCategorySaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
