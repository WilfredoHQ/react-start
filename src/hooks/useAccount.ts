import { useMutation, useQuery } from "@tanstack/react-query"
import { current, login, recover, resetPassword } from "src/services"
import { useAuth } from "./useAuth"

export const useCurrentQuery = () => {
  return useQuery({ queryKey: ["account", "current"], queryFn: current })
}

export const useLoginMutation = () => {
  const { handleLogin } = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: token => {
      token.accessToken !== undefined && handleLogin(token.accessToken)
    },
  })
}

export const useRecoverMutation = () => {
  return useMutation({ mutationFn: recover })
}

export const useResetPasswordMutation = () => {
  return useMutation({ mutationFn: resetPassword })
}
