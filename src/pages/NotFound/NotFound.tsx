import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import s from "./NotFound.module.scss"

const NotFound = () => {
  return (
    <div className={s.notFound}>
      <main className={s.main}>
        <h2>NotFound</h2>
        <Button component={Link} variant="contained" to="/home">
          Regresar al inicio
        </Button>
      </main>
    </div>
  )
}

export default NotFound
