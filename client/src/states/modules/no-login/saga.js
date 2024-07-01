import {  all, fork, put} from "redux-saga/effects";
import {setTitlePage} from "../app";

function* loadRouteData () {
  yield put(setTitlePage('Danh sách bài viết'))
}

function* handleActions () {
  //;
}

export default function* loadNoLoginSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
