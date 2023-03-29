import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
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

export const useReadPostsInfiniteQuery = ({
  skip = 0,
  limit = 20,
  ...rest
}: V1PostsListParams) => {
  return useInfiniteQuery({
    queryKey: ["posts", rest],
    queryFn: async ({ pageParam = skip }) =>
      await readPosts({ ...rest, skip: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const posts = ([] as Post[]).concat(...allPages)

      return posts.length
    },
  })
}

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: async post => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      queryClient.setQueryData<Post[]>(["posts", { userId: user?.id }], oldPosts => {
        return [post, ...(oldPosts ?? [])]
      })

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
  })
}

export const useReadHomePostsInfiniteQuery = ({
  skip = 0,
  limit = 20,
  ...rest
}: V1PostsHomeListParams) => {
  return useInfiniteQuery({
    queryKey: ["posts", "home", rest],
    queryFn: async ({ pageParam = skip }) =>
      await readHomePosts({ ...rest, skip: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const posts = ([] as Post[]).concat(...allPages)

      return posts.length
    },
  })
}

export const useReadPostQuery = (postId: string) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => await readPost(postId),
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (_, postId) => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      queryClient.setQueryData<Post[]>(["posts", { userId: user?.id }], oldPosts => {
        return oldPosts?.filter(p => p.id !== postId)
      })

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async (post, { postId }) => {
      const user = queryClient.getQueryData<User>(["account", "current"])

      queryClient.setQueryData<Post[]>(["posts", { userId: user?.id }], oldPosts => {
        return oldPosts?.map(p => (p.id === postId ? post : p))
      })

      await queryClient.invalidateQueries({
        queryKey: ["posts", { userId: user?.id }],
      })
    },
  })
}