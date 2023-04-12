import {
  type V1PostsHomeListParams,
  type Msg,
  type Post,
  type PostCreate,
  type PostUpdate,
  type V1PostsListParams,
} from "src/models"
import { startClient } from "./client"

export const getPosts = async (v1PostsListParams: V1PostsListParams) => {
  const { data } = await startClient.get<Post[]>("/posts", {
    params: v1PostsListParams,
  })

  return data
}

export const createPost = async (postCreate: PostCreate) => {
  const { data } = await startClient.post<Post>("/posts", postCreate)

  return data
}

export const getHomePosts = async (v1PostsHomeListParams: V1PostsHomeListParams) => {
  const { data } = await startClient.get<Post[]>("/posts/home", {
    params: v1PostsHomeListParams,
  })

  return data
}

export const getPost = async (postId: string) => {
  const { data } = await startClient.get<Post>(`/posts/${postId}`)

  return data
}

export const deletePost = async (postId: string) => {
  const { data } = await startClient.delete<Msg>(`/posts/${postId}`)

  return data
}

export const updatePost = async ({
  postId,
  postUpdate,
}: {
  postId: string
  postUpdate: PostUpdate
}) => {
  const { data } = await startClient.patch<Post>(`/posts/${postId}`, postUpdate)

  return data
}
