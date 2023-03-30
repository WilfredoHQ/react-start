import { Button, CircularProgress, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useCreateUser } from "src/hooks/useUsers"
import s from "./Register.module.scss"

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const createUser = useCreateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    const { confirmPassword, ...rest } = data

    createUser.mutate(rest, {
      onError: error => {
        let content = "Ha ocurrido un error"

        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 409:
              content = "El usuario con este correo ya existe en el sistema"
              setFocus("email")
              break
          }
        }

        toast.error(content)
      },
    })
  })

  return (
    <div className={s.register}>
      <main className={s.main}>
        <h2 className={s.title}>Crea tu cuenta</h2>
        <form onSubmit={onSubmit} autoComplete="off" noValidate className={s.form}>
          <TextField
            required
            type="text"
            placeholder="Jane Doe"
            label="Nombre completo"
            variant="outlined"
            helperText={errors.fullName?.message}
            error={errors.fullName !== undefined}
            {...register("fullName", {
              required: { value: true, message: "Este campo es obligatorio" },
            })}
          />
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
            disabled={createUser.status === "loading"}
            variant="contained"
            className={s.submit}
          >
            Crear cuenta
            {createUser.status === "loading" && (
              <CircularProgress size={16} color="inherit" />
            )}
          </Button>
        </form>
        <p className={s.option}>
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </main>
    </div>
  )
}

export default Register
