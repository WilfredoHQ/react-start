import { Button, CircularProgress, Link, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom"
import { useResetPassword } from "src/hooks/useAccount"
import s from "./ResetPassword.module.scss"

interface FormData {
  password: string
  confirmPassword: string
}

const ResetPassword = () => {
  const resetPassword = useResetPassword()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    const { password } = data
    const token = searchParams.get("token")

    token !== null &&
      resetPassword.mutate(
        { token, newPassword: password },
        {
          onSuccess: ({ msg }) => {
            switch (msg) {
              case "password_updated":
                navigate("/", { replace: true })
                break
            }
          },
        }
      )
  })

  return (
    <div className={s.resetPassword}>
      <main className={s.main}>
        <h2 className={s.title}>Restablece tu contraseña</h2>
        <form onSubmit={onSubmit} autoComplete="off" noValidate className={s.form}>
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
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
            })}
          />
          <TextField
            required
            type="password"
            placeholder={"•".repeat(12)}
            label="Confirma tu contraseña"
            variant="outlined"
            helperText={errors.confirmPassword?.message}
            error={errors.confirmPassword !== undefined}
            {...register("confirmPassword", {
              required: { value: true, message: "Este campo es obligatorio" },
              validate: (value, formValues) => {
                return formValues.password === value || "Las contraseñas no coinciden"
              },
            })}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={resetPassword.isLoading}
            className={s.submit}
          >
            Restablecer contraseña
            {resetPassword.isLoading && <CircularProgress size={16} color="inherit" />}
          </Button>
        </form>
        <p className={s.option}>
          ¿Tienes inconvenientes?{" "}
          <Link component={RouterLink} to="/recuperar" underline="hover">
            Enviar nuevo correo
          </Link>
        </p>
      </main>
    </div>
  )
}

export default ResetPassword
