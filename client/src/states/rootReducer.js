import appReducer from "./modules/app"
import authReducer from "./modules/auth"
import profileReducer from "./modules/profile"
import homeReducer from "./modules/home"
import aboutReducer from "./modules/about"
import employeeReducer from "./modules/employee"
import userReducer from "./modules/user"
import authorReducer from "./modules/author"
import categoryReducer from "./modules/category"
import categoryDetailReducer from "./modules/category-detail"
import postReducer from "./modules/post"
import postDetailReducer from "./modules/post-detail"
import noLoginReducer from "./modules/no-login"

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  about: aboutReducer,
  employee: employeeReducer,
  user: userReducer,
  author: authorReducer,
  category: categoryReducer,
  post: postReducer,
  postDetail: postDetailReducer,
  categoryDetail: categoryDetailReducer,
  noLogin: noLoginReducer,
}

export default rootReducer
