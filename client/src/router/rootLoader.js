// xử lý việc tải dữ liệu và định hướng trang
import { redirect } from "react-router-dom" // điều hướng tới các trang
import store from "../states/configureStore"
import { initialSaga } from "../states/modules/routing" // khởi tạo dữ liệu hoặc thực hiện hành động
import { hasPermission } from "../utils/helper" // kiểm tra quyền truy cập
import { getMe } from "../api/auth" //  lấy thông tin người dùng hiện tại
import { getAuthToken } from "../utils/localStorage"  //  lấy token xác thực từ local storage

export const rootLoader = async ({ request }, requiredAuth, saga = null, permissions = []) => {
  const url = new URL(request.url)
  let { auth } = store.getState()

  const firstCondition = !auth.isAuthSuccess && getAuthToken()
  const secondCondition = url.pathname === "/profile"

  if (firstCondition || secondCondition) {
    await store.dispatch(getMe())
    auth = store.getState().auth
  }

  if (requiredAuth) {
    if (auth.isAuthSuccess) {
      if (permissions.length > 0 && !hasPermission(permissions)) {
        // người dùng không có quyền -> 403
        return redirect("/403")
      }
    } else {
      // không được xác thực -> login
      return redirect("/login")
    }
  } else if (auth.isAuthSuccess) {
    // đã xác thực -> users
    return redirect("/users")
  }

  

  if (saga) {
    store.dispatch(initialSaga(saga))
  }

  return null
}
