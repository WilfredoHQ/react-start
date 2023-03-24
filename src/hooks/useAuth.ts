import { useQueryClient } from "@tanstack/react-query"
import {
  removeAccessToken,
  selectAccessToken,
  setAccessToken,
} from "src/store/slices/token.slice"
import { useAppDispatch, useAppSelector } from "./useStore"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(selectAccessToken)
  const queryClient = useQueryClient()

  const handleLogin = (accessToken: string) => {
    dispatch(setAccessToken(accessToken))
  }

  const handleLogout = () => {
    queryClient.clear()
    dispatch(removeAccessToken())
  }

  return { accessToken, handleLogin, handleLogout }
}
