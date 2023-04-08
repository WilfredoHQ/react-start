import { Button, CircularProgress, Link, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { useLogin } from "src/hooks/useAccount"
import s from "./Login.module.scss"

interface FormData {
  username: string
  password: string
}

const Login = () => {
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    login.mutate(data)
  })

  return (
    <div className={s.login}>
      <main className={s.main}>
        <h2 className={s.title}>Inicia sesión</h2>
        <form onSubmit={onSubmit} autoComplete="off" noValidate className={s.form}>
          <TextField
            required
            type="email"
            placeholder="jane.doe@gmail.com"
            label="Correo electrónico"
            variant="outlined"
            helperText={errors.username?.message}
            error={errors.username !== undefined}
            {...register("username", {
              required: { value: true, message: "Este campo es obligatorio" },
            })}
          />
          <TextField
            required
            type="password"
            placeholder={"•".repeat(12)}
            label="Contraseña"
            variant="outlined"
            helperText={errors.password?.message}
            error={errors.password !== undefined}
            {...register("password", {
              required: { value: true, message: "Este campo es obligatorio" },
            })}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={login.status === "loading"}
            className={s.submit}
          >
            Iniciar sesión
            {login.status === "loading" && (
              <CircularProgress size={16} color="inherit" />
            )}
          </Button>
        </form>
        <p className={s.option}>
          ¿No tienes una cuenta?{" "}
          <Link component={RouterLink} to="/registro" underline="hover">
            Regístrate gratis
          </Link>
        </p>
        <p className={s.option}>
          <Link component={RouterLink} to="/recuperar" underline="hover">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Login
