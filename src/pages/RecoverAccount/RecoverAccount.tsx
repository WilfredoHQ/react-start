import { Button, CircularProgress, Link, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecover } from "src/hooks/useAccount"
import s from "./RecoverAccount.module.scss"

interface FormData {
  email: string
}

const RecoverAccount = () => {
  const recover = useRecover()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    recover.mutate(data, {
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
            disabled={recover.status === "loading"}
            variant="contained"
            className={s.submit}
          >
            Recuperar cuenta
            {recover.status === "loading" && (
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
