import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { type User, type Follow, type V1FollowsListParams } from "src/models"
import { createFollow, deleteFollow, readFollow, readFollows } from "src/services"

export const useReadFollows = ({
  skip = 0,
  limit = 20,
  ...rest
}: V1FollowsListParams) => {
  const result = useInfiniteQuery({
    queryKey: ["follows", rest],
    queryFn: async ({ pageParam = skip }) =>
      await readFollows({ ...rest, skip: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const follows = ([] as Follow[]).concat(...allPages)

      return follows.length
    },
  })

  const allData = ([] as Follow[]).concat(...(result.data?.pages ?? []))

  return { ...result, allData }
}

export const useCreateFollow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFollow,
    onSuccess: async follow => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      await queryClient.invalidateQueries({
        queryKey: ["follows", { followerId: user?.id }],
      })
    },
  })
}

export const useReadFollow = (followId: string) => {
  return useQuery({
    queryKey: ["follows", followId],
    queryFn: async () => await readFollow(followId),
  })
}

export const useDeleteFollow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFollow,
    onSuccess: async (_, followId) => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      await queryClient.invalidateQueries({
        queryKey: ["follows", { followerId: user?.id }],
      })
    },
  })
}
