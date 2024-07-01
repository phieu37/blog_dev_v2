import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  changePasswordFail,
  changePasswordSuccess, setErrorChangePassword,
  setErrorInfoUser,
  updateInfoUserFail,
  updateInfoUserSuccess,
  changeAvatarSuccess,
} from "./index";
import {getNotification} from "../../../utils/helper";
import {getMe} from "../../../api/auth";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('Profile'));
  yield put(setErrorInfoUser({
    name: '',
    email: '',
    phone: '',
  }));
  yield put(setErrorChangePassword({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }));
}

function* handleActions () {
  yield takeLatest(updateInfoUserSuccess, function* () {
    getNotification('success', 'Cập nhật thông tin thành công');
    yield put(getMe());
  });

  yield takeLatest(updateInfoUserFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorInfoUser({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone', ''),
      }));
    }
    getNotification('error', 'Cập nhật thông tin thất bại');
  });

  yield takeLatest(changePasswordSuccess, function* () {
    yield call(getNotification, 'success', 'Đổi mật khẩu thành công');
    yield put(getMe());
  });

  yield takeLatest(changePasswordFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorChangePassword({
        currentPassword: _.get(errors, 'password', ''),
        newPassword: _.get(errors, 'new_password', ''),
        confirmPassword: _.get(errors, 'password_confirmation', ''),
      }));
    }
    getNotification('error', 'Đổi mật khẩu thất bại');
  });

  yield takeLatest(changeAvatarSuccess, function* () {
    yield call(getNotification, 'success', 'Thay đổi avatar thành công');
    yield put(getMe());
  });
}

export default function* loadProfileSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
