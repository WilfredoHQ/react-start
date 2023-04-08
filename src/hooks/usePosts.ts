import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "react-toastify"
import {
  type User,
  type Post,
  type V1PostsListParams,
  type V1PostsHomeListParams,
} from "src/models"
import {
  createPost,
  deletePost,
  readHomePosts,
  readPost,
  readPosts,
  updatePost,
} from "src/services"
import { getErrorDetail } from "src/utilities/get-error-detail.utility"

export const useReadPosts = ({ skip = 0, limit = 20, ...rest }: V1PostsListParams) => {
  const result = useInfiniteQuery({
    queryKey: ["posts", rest],
    queryFn: async ({ pageParam = skip }) => {
      return await readPosts({ ...rest, skip: pageParam, limit })
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const posts = ([] as Post[]).concat(...allPages)

      return posts.length
    },
  })

  const allData = ([] as Post[]).concat(...(result.data?.pages ?? []))

  return { ...result, allData }
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
  })
}

export const useReadHomePosts = ({
  skip = 0,
  limit = 20,
  ...rest
}: V1PostsHomeListParams) => {
  const result = useInfiniteQuery({
    queryKey: ["posts", "home", rest],
    queryFn: async ({ pageParam = skip }) => {
      return await readHomePosts({ ...rest, skip: pageParam, limit })
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const posts = ([] as Post[]).concat(...allPages)

      return posts.length
    },
  })

  const allData = ([] as Post[]).concat(...(result.data?.pages ?? []))

  return { ...result, allData }
}

export const useReadPost = (postId: string) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      return await readPost(postId)
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "post_not_found":
          toast.error("La publicación no ha sido encontrada.")
          break
      }
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "post_not_found":
          toast.error("La publicación no ha sido encontrada.")
          break
      }
    },
  })
}
