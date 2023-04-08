import { AxiosError } from "axios"
import { type Error } from "../models/api.model"

export const getErrorDetail = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return
  }

  const { response } = error
  const { status, data } = response ?? {}

  if (status === 422) {
    return "validation"
  }

  return (data as Error).detail
}
