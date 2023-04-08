import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { type FollowerRelation } from "src/models"
import {
  createFollowerRelation,
  deleteFollowerRelation,
  checkFollowerRelation,
} from "src/services"
import { getErrorDetail } from "src/utilities/get-error-detail.utility"

export const useCreateFollowerRelation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFollowerRelation,
    onSuccess: async (_, { followedId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["follower-relations", "following", followedId],
      })
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "follower_relation_already_registered":
          toast.error("Ya hay una relación de seguimiento registrada con este usuario.")
          break
      }
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
    onError: error => {
      switch (getErrorDetail(error)) {
        case "follower_relation_not_found":
          toast.error("La relación de seguidor para el usuario no ha sido encontrada.")
          break
      }
    },
  })
}
