import {
  all, fork, put

} from "redux-saga/effects";
import {setTitlePage} from "../app";

function* loadRouteData () {
  yield put(setTitlePage('Thống kê'))
}

function* handleActions () {
  //;
}

export default function* loadHomeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
