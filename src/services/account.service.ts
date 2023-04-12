import {
  type Msg,
  type RecoverAccount,
  type ResetPassword,
  type Token,
  type User,
  type V1AccountLoginCreatePayload,
} from "src/models"
import { startClient } from "./client"

export const getCurrentAccount = async () => {
  const { data } = await startClient.get<User>("/account/current")

  return data
}

export const login = async (
  v1AccountLoginCreatePayload: V1AccountLoginCreatePayload
) => {
  const { data } = await startClient.post<Token>(
    "/account/login",
    v1AccountLoginCreatePayload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  return data
}

export const recoverAccount = async (recover: RecoverAccount) => {
  const { data } = await startClient.post<Msg>("/account/recover", recover)

  return data
}

export const resetPassword = async (resetPassword: ResetPassword) => {
  const { data } = await startClient.post<Msg>("/account/reset-password", resetPassword)

  return data
}
