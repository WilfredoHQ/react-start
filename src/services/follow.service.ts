import {
  type Follow,
  type FollowCreate,
  type Msg,
  type V1FollowsListParams,
} from "src/models"
import { startClient } from "./client"

export const readFollows = async (v1FollowsListParams: V1FollowsListParams) => {
  const { data } = await startClient.get<Follow[]>("/follows", {
    params: v1FollowsListParams,
  })

  return data
}

export const createFollow = async (followCreate: FollowCreate) => {
  const { data } = await startClient.post<Follow>("/follows", followCreate)

  return data
}

export const readFollow = async (followId: string) => {
  const { data } = await startClient.get<Follow>(`/follows/${followId}`)

  return data
}

export const deleteFollow = async (followId: string) => {
  const { data } = await startClient.delete<Msg>(`/follows/${followId}`)

  return data
}
