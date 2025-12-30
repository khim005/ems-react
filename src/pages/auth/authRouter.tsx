import AuthLayout from "../layouts/AuthLayout"
import RegisterPage from "./Register"
import LoginPage from "./Login"


export const AuthRouter = [{
    path: "/", element: <AuthLayout />, children: [
      { index: true, element: <LoginPage /> },
      { path: "register", Component: RegisterPage }
    ],
  }]