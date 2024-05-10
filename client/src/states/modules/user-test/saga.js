import { all, fork, put } from "redux-saga/effects"
import { requestGetListUsers } from "../../../api/user"

function* loadRouteData() {
  yield put(requestGetListUsers())
}

function* handleActions() {}

export default function* loadUserSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
