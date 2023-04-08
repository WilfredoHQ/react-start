import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { type User, type V1UsersListParams } from "src/models"
import { createUser, readUser, readUsers, updateUser } from "src/services"
import { useLogin } from "./useAccount"
import { getErrorDetail } from "src/utilities/get-error-detail.utility"
import { toast } from "react-toastify"

export const useReadUsers = ({ skip = 0, limit = 20, ...rest }: V1UsersListParams) => {
  const result = useInfiniteQuery({
    queryKey: ["users", rest],
    queryFn: async ({ pageParam = skip }) => {
      return await readUsers({ ...rest, skip: pageParam, limit })
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return false

      const users = ([] as User[]).concat(...allPages)

      return users.length
    },
  })

  const allData = ([] as User[]).concat(...(result.data?.pages ?? []))

  return { ...result, allData }
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
    onError: error => {
      switch (getErrorDetail(error)) {
        case "user_already_registered":
          toast.error(
            "Ya existe una cuenta asociada con esta dirección de correo electrónico."
          )
          break
      }
    },
  })
}

export const useReadUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      return await readUser(userId)
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["account", "current"] })
    },
    onError: error => {
      switch (getErrorDetail(error)) {
        case "user_not_found":
          toast.error("El usuario no ha sido encontrado.")
          break
      }
    },
  })
}
