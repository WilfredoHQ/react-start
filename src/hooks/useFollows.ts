import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type FollowerRelation } from "src/models"
import {
  createFollowerRelation,
  deleteFollowerRelation,
  checkFollowerRelation,
} from "src/services"

export const useCreateFollowerRelation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFollowerRelation,
    onSuccess: async (_, { followedId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["follower-relations", "following", followedId],
      })
    },
  })
}

export const useCheckFollowerRelation = (userId: string) => {
  return useQuery({
    queryKey: ["follower-relations", "following", userId],
    queryFn: async () => {
      return await checkFollowerRelation(userId)
    },
  })
}

export const useDeleteFollowerRelation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (followerRelation: FollowerRelation) => {
      return await deleteFollowerRelation(followerRelation.id)
    },
    onSuccess: async (_, { followedId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["follower-relations", "following", followedId],
      })
    },
  })
}
