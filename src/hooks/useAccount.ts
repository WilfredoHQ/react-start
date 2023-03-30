import { useMutation, useQuery } from "@tanstack/react-query"
import { current, login, recover, resetPassword } from "src/services"
import { useAuth } from "./useAuth"

export const useCurrent = () => {
  return useQuery({ queryKey: ["account", "current"], queryFn: current })
}

export const useLogin = () => {
  const { handleLogin } = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: token => {
      token.accessToken !== undefined && handleLogin(token.accessToken)
    },
  })
}

export const useRecover = () => {
  return useMutation({ mutationFn: recover })
}

export const useResetPassword = () => {
  return useMutation({ mutationFn: resetPassword })
}
