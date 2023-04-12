import { Button, CircularProgress, Link, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { useRecoverAccount } from "src/hooks/useAccount"
import s from "./RecoverAccount.module.scss"

interface FormData {
  email: string
}

const RecoverAccount = () => {
  const recover = useRecoverAccount()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    recover.mutate(data)
  })

  return (
    <div className={s.recoverAccount}>
      <main className={s.main}>
        <h2 className={s.title}>Recupera tu cuenta</h2>
        <form onSubmit={onSubmit} autoComplete="off" noValidate className={s.form}>
          <TextField
            required
            type="email"
            placeholder="jane.doe@gmail.com"
            label="Correo electrónico"
            variant="outlined"
            helperText={errors.email?.message}
            error={errors.email !== undefined}
            {...register("email", {
              required: { value: true, message: "Este campo es obligatorio" },
              pattern: {
                value: /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
                message: "Correo no válido",
              },
            })}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={recover.isLoading}
            className={s.submit}
          >
            Recuperar cuenta
            {recover.isLoading && <CircularProgress size={16} color="inherit" />}
          </Button>
        </form>
        <p className={s.option}>
          ¿No tienes una cuenta?{" "}
          <Link component={RouterLink} to="/registro" underline="hover">
            Regístrate gratis
          </Link>
        </p>
        <p className={s.option}>
          ¿Recordaste tu contraseña?{" "}
          <Link component={RouterLink} to="/" underline="hover">
            Inicia sesión
          </Link>
        </p>
      </main>
    </div>
  )
}

export default RecoverAccount
