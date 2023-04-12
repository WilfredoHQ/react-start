import { useMutation, useQuery } from "@tanstack/react-query"
import { getCurrentAccount, login, recoverAccount, resetPassword } from "src/services"
import { useAuth } from "./useAuth"
import { toast } from "react-toastify"
import { getErrorDetail } from "src/utilities/get-error-detail.utility"

export const useGetCurrentAccount = () => {
  return useQuery({ queryKey: ["account", "current"], queryFn: getCurrentAccount })
}

export const useLogin = () => {
  const { handleLogin } = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: token => {
      handleLogin(token.accessToken)
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "invalid_credentials":
          toast.error("Correo electrónico o contraseña incorrectos.")
          break
        case "user_inactive":
          toast.error("Actualmente, la cuenta no está activa.")
          break
      }
    },
  })
}

export const useRecoverAccount = () => {
  return useMutation({
    mutationFn: recoverAccount,
    onSuccess: ({ msg }) => {
      switch (msg) {
        case "email_sent":
          toast.success("El correo de recuperación de cuenta ha sido enviado.")
          break
      }
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "user_not_found":
          toast.error("El usuario no ha sido encontrado.")
          break
      }
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: ({ msg }) => {
      switch (msg) {
        case "password_updated":
          toast.success("Tu contraseña ha sido actualizada.")
          break
      }
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "invalid_jwt":
          toast.error(
            "El enlace ha caducado o ya no es válido, por favor solicita uno nuevo."
          )
          break
      }
    },
  })
}
