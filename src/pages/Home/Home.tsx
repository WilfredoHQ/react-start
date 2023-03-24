import { Button } from "@mui/material"
import { useAuth } from "src/hooks/useAuth"
import { useCurrentQuery } from "src/hooks/useAccount"
import s from "./Home.module.scss"

const Home = () => {
  const { handleLogout } = useAuth()
  const currentQuery = useCurrentQuery()

  return (
    <div className={s.home}>
      <main className={s.main}>
        <h2>Bienvenido {currentQuery.data?.fullName ?? "Usuario"}</h2>
        <Button variant="contained" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </main>
    </div>
  )
}

export default Home
