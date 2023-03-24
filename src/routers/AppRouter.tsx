import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "src/pages/Home"
import Login from "src/pages/Login"
import NotFound from "src/pages/NotFound"
import RecoverAccount from "src/pages/RecoverAccount"
import Register from "src/pages/Register"
import ResetPassword from "src/pages/ResetPassword"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="recuperar" element={<RecoverAccount />} />
          <Route path="restablecer" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
