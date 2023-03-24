import { Button, CircularProgress, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useResetPasswordMutation } from "src/hooks/useAccount"
import s from "./ResetPassword.module.scss"

interface FormData {
  password: string
  confirmPassword: string
}

const Reset = () => {
  const resetPasswordMutation = useResetPasswordMutation()
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
      resetPasswordMutation.mutate(
        { token, newPassword: password },
        {
          onSuccess: () => {
            navigate("/", { replace: true })
          },
          onError: error => {
            let content = "Ha ocurrido un error"

            if (error instanceof AxiosError) {
              switch (error.response?.status) {
                case 401:
                  content = "El link ya no es válido"
                  break
              }
            }

            toast.error(content)
          },
        }
      )
  })

  return (
    <div className={s.reset}>
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
          <div className={s.submit}>
            <Button
              type="submit"
              disabled={resetPasswordMutation.status === "loading"}
              variant="contained"
            >
              Restablecer contraseña
            </Button>
            {resetPasswordMutation.status === "loading" && (
              <div className={s.loading}>
                <CircularProgress size={16} />
              </div>
            )}
          </div>
        </form>
        <p className={s.option}>
          ¿Tienes inconvenientes? <Link to="/recuperar">Enviar nuevo correo</Link>
        </p>
      </main>
    </div>
  )
}

export default Reset
