export type LocalStorageKeys = "accessToken"

export const getLocalStorageItem = <T>(key: LocalStorageKeys) => {
  const item = localStorage.getItem(key)

  if (item === null) return null

  try {
    return JSON.parse(item) as T
  } catch (error) {
    return item as T
  }
}

export const setLocalStorageItem = <T>(key: LocalStorageKeys, value: T) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.removeItem(key)
  }
}
