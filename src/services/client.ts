import axios from "axios"
import { getLocalStorageItem } from "src/utilities"

export const startClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL as string}/api/v1`,
})

startClient.interceptors.request.use(
  config => {
    const accessToken = getLocalStorageItem<string>("accessToken")

    if (accessToken !== null && accessToken !== "")
      config.headers.authorization = `Bearer ${accessToken}`

    return config
  },
  async error => await Promise.reject(error)
)
