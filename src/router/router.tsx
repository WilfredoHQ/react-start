import { createBrowserRouter } from "react-router-dom"
import Layout from "src/components/Layout"
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
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/configuracion",
            element: <div>Configuración</div>,
          },
          {
            path: "/usuarios",
            element: <div>Usuarios</div>,
          },
          {
            path: "/usuarios/:userId",
            element: <div>Perfil</div>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
