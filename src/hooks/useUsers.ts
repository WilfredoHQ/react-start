import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { type User, type V1UsersListParams } from "src/models"
import { createUser, readUser, readUsers, updateUser } from "src/services"
import { useLogin } from "./useAccount"

export const useReadUsers = ({ skip = 0, limit = 20, ...rest }: V1UsersListParams) => {
  return useInfiniteQuery({
    queryKey: ["users", rest],
    queryFn: async ({ pageParam = skip }) =>
      await readUsers({ ...rest, skip: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const users = ([] as User[]).concat(...allPages)

      return users.length
    },
  })
}

export const useCreateUser = () => {
  const login = useLogin()

  return useMutation({
    mutationFn: createUser,
    onSuccess: (_, userCreate) => {
      login.mutate({
        username: userCreate.email,
        password: userCreate.password,
      })
    },
  })
}

export const useReadUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => await readUser(userId),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async user => {
      queryClient.setQueryData(["account", "current"], user)
      await queryClient.invalidateQueries({ queryKey: ["account", "current"] })
    },
  })
}
