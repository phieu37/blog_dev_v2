
// saga thực hiện các tác vụ liên quan đến việc quản lý người dùng: tạo, cập nhật, xóa
import { all, fork, put, takeLatest, call } from "redux-saga/effects"
import { setTitlePage } from "../app"
import { getListPost } from "../../../api/post"
import {
  setErrorCreateOrUpdatePost,
  setVisibleModalCreateOrUpdatePost,
  setVisibleModalDeletePost,
  createPostFail,
  createPostSuccess,
  updatePostFail,
  updatePostSuccess,
  deletePostFail,
  deletePostSuccess,
} from "./index"
import { getNotification } from "../../../utils/helper"
import _ from "lodash"

function* loadRouteData() {
  yield put(setTitlePage("Post"))
  // yield put(getListPost())
}

function* handleActions() {
  yield takeLatest(createPostSuccess, function* () {
    getNotification("success", "Create post success")
    yield put(setVisibleModalCreateOrUpdatePost(false))
    yield put(getListPost());
  })

  yield takeLatest(createPostFail, function* (action) {
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdatePost({
          name: _.get(errors, "name", ""),
          description: _.get(errors, "description", ""),
          thumbnail: _.get(errors, "thumbnail", ""),
          author: _.get(errors, "author", ""),
        })
      )
    }
    getNotification("error", "Create post fail")
  })

  yield takeLatest(updatePostSuccess, function* () {
    getNotification("success", "Update post success")
    yield put(setVisibleModalCreateOrUpdatePost(false))
    yield put(getListPost())
  })

  yield takeLatest(updatePostFail, function* (action) {
    let status = action.payload.status
    if (status === 400) {
      let errors = action.payload.data.errors
      yield put(
        setErrorCreateOrUpdatePost({
          title: _.get(errors, "title", ""),
          content: _.get(errors, "content", ""),
          thumbnail: _.get(errors, "thumbnail", ""),
          author: _.get(errors, "author", ""),
        })
      )
    }
    getNotification("error", "Update post fail")
  })

  yield takeLatest(deletePostSuccess, function* () {
    getNotification("success", "Delete post success")
    yield put(setVisibleModalDeletePost(false))
    yield put(getListPost())
  })

  yield takeLatest(deletePostFail, function* () {
    yield call(getNotification, "error", "Failed to delete post.")
  })
}

export default function* loadPostSaga() {
  yield all([fork(loadRouteData), fork(handleActions)])
}
