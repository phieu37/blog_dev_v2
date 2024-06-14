import {
  all, fork, put

} from "redux-saga/effects";
import {setTitlePage} from "../app";

function* loadRouteData () {
  yield put(setTitlePage('NoLogin'))
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
