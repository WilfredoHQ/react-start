import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "src/hooks/useAuth"
import { validateJwt } from "src/utilities"

const PublicRoute = () => {
  const { accessToken } = useAuth()

  if (accessToken !== null && validateJwt(accessToken) !== null) {
    return <Navigate to="/home" replace />
  } else {
    return <Outlet />
  }
}

export default PublicRoute
