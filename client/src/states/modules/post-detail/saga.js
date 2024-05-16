
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put } from "redux-saga/effects"
import { setTitlePage } from "../app"

function* loadRouteData() {
  yield put(setTitlePage("Post detail"))

}

function* handleActions() {

}

export default function* loadPostDetailSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
