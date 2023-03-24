import { Button, CircularProgress, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoverMutation } from "src/hooks/useAccount"
import s from "./RecoverAccount.module.scss"

interface FormData {
  email: string
}

const RecoverAccount = () => {
  const recoverMutation = useRecoverMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    recoverMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Correo electrónico de recuperación de cuenta enviado")
      },
      onError: error => {
        let content = "Ha ocurrido un error"

        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 404:
              content = "El correo no existe"
              break
          }
        }

        toast.error(content)
      },
    })
  })

  return (
    <div className={s.recover}>
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
          <div className={s.submit}>
            <Button
              type="submit"
              disabled={recoverMutation.status === "loading"}
              variant="contained"
            >
              Recuperar cuenta
            </Button>
            {recoverMutation.status === "loading" && (
              <div className={s.loading}>
                <CircularProgress size={16} />
              </div>
            )}
          </div>
        </form>
        <p className={s.option}>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate gratis</Link>
        </p>
        <p className={s.option}>
          ¿Recordaste tu contraseña? <Link to="/">Inicia sesión</Link>
        </p>
      </main>
    </div>
  )
}

export default RecoverAccount
