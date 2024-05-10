import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import ForgotPassword from "../pages/Auth/ForgotPassword"
import Profile from "../pages/Profile"
// import Home from "../pages/Home"
import About from "../pages/About"
import Employee from "../pages/Employee"
// import UserManagement from "../pages/User"
import { rootLoader } from "./rootLoader"
import User from "../pages/User"
import Author from "../pages/Author"
import Category from "../pages/Category"
import Post from "../pages/Post"
import PostDetail from "../pages/PostDetail"
import CategoryDetail from "../pages/CategoryDetail"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_PROFILE_PAGE"),
  },
  {
    path: "/",
    // element: <Home />,
    element: <User />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_HOME_PAGE"),
  },
  {
    path: "/about",
    element: <About />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_ABOUT_PAGE"),
    children: [
      {
        path: ":id",
        element: <About />,
        loader: ({ request }) => rootLoader({ request }, true, "LOAD_ABOUT_PAGE"),
      },
    ],
  },
  {
    path: "/employee",
    element: <Employee />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_EMPLOYEE_PAGE"),
  },
  {
    path: "/users",
    element: <User />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_USER_PAGE"),
  },
  {
    path: "/register",
    element: <Register />,
    loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
  },
  {
    path: "/authors",
    element: <Author />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_AUTHOR_PAGE"),
  },
  {
    path: "/categories",
    element: <Category />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_CATEGORY_PAGE"),
  },
  {
    path: "/categories/:categoryId",
    element: <CategoryDetail />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_CATEGORY_DETAIL_PAGE"),
  },
  {
    path: "/posts",
    element: <Post />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_POST_PAGE"),
  },
  {
    path: "/posts/:postId",
    element: <PostDetail />,
    loader: ({ request }) => rootLoader({ request }, true, "LOAD_POST_DETAIL_PAGE"),
  },
])

export default router
