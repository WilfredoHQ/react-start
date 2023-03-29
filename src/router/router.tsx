import { createBrowserRouter } from "react-router-dom"
import Home from "src/pages/Home"
import Login from "src/pages/Login"
import NotFound from "src/pages/NotFound"
import RecoverAccount from "src/pages/RecoverAccount"
import Register from "src/pages/Register"
import ResetPassword from "src/pages/ResetPassword"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registro",
        element: <Register />,
      },
      {
        path: "/recuperar",
        element: <RecoverAccount />,
      },
      {
        path: "/restablecer",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
