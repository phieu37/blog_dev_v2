
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put } from "redux-saga/effects"
import { setTitlePage } from "../app"

function* loadRouteData() {
  yield put(setTitlePage("Chi tiết danh mục"))

}

function* handleActions() {

}

export default function* loadCategoryDetailSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
