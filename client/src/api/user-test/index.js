import { getListUsers, getListUsersFail, getListUsersSuccess } from "../../states/modules/user/index.js"
import callApi from "../callApi.js"

export const requestGetListUsers = () => async (dispatch, getState) => {
  const dataFilter = getState().user.dataFilter
  return callApi({
    method: "get",
    apiPath: "users",
    actionTypes: [getListUsers, getListUsersSuccess, getListUsersFail],
    variables: dataFilter,
    dispatch,
    getState,
  })
}
