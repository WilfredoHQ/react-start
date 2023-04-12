import {
  type User,
  type UserCreate,
  type UserUpdate,
  type V1UsersListParams,
} from "src/models"
import { startClient } from "./client"

export const getUsers = async (v1UsersListParams: V1UsersListParams) => {
  const { data } = await startClient.get<User[]>("/users", {
    params: v1UsersListParams,
  })

  return data
}

export const createUser = async (userCreate: UserCreate) => {
  const { data } = await startClient.post<User>("/users", userCreate)

  return data
}

export const getUser = async (userId: string) => {
  const { data } = await startClient.get<User>(`/users/${userId}`)

  return data
}

export const updateUser = async ({
  userId,
  userUpdate,
}: {
  userId: string
  userUpdate: UserUpdate
}) => {
  const { data } = await startClient.patch<User>(`/users/${userId}`, userUpdate)

  return data
}
