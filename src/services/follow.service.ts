import {
  type FollowerRelation,
  type FollowerRelationCreate,
  type Msg,
} from "src/models"
import { startClient } from "./client"

export const createFollowerRelation = async (
  followRelationCreate: FollowerRelationCreate
) => {
  const { data } = await startClient.post<FollowerRelation>(
    "/follower-relations",
    followRelationCreate
  )

  return data
}

export const checkFollowerRelation = async (userId: string) => {
  const { data } = await startClient.get<FollowerRelation>(
    `/follower-relations/following/${userId}`
  )

  return data
}

export const deleteFollowerRelation = async (followerRelationId: string) => {
  const { data } = await startClient.delete<Msg>(
    `/follower-relations/${followerRelationId}`
  )

  return data
}
