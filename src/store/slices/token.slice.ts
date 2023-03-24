import { type PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getLocalStorageItem, setLocalStorageItem } from "src/utilities"
import { type RootState } from ".."

export interface TokenState {
  accessToken: string | null
}

export const TokenEmptyState: TokenState = {
  accessToken: getLocalStorageItem<string>("accessToken"),
}

const tokenSlice = createSlice({
  name: "token",
  initialState: TokenEmptyState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      setLocalStorageItem("accessToken", action.payload)
      state.accessToken = action.payload
    },
    removeAccessToken: state => {
      setLocalStorageItem("accessToken", null)
      state.accessToken = null
    },
    resetToken: () => {
      return TokenEmptyState
    },
  },
})

export const { setAccessToken, removeAccessToken, resetToken } = tokenSlice.actions

export const selectAccessToken = (state: RootState) => state.token.accessToken

export const tokenReducer = tokenSlice.reducer
