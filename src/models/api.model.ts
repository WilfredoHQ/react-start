/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  detail: string
}

export interface FollowerRelation {
  createdAt: string
  followedId: string
  followerId: string
  id: string
  updatedAt: string
}

export interface FollowerRelationCreate {
  followedId: string
}

export interface Msg {
  msg: string
}

export interface Post {
  content: string
  createdAt: string
  id: string
  updatedAt: string
  user: PostUser
  userId: string
}

export interface PostCreate {
  content: string
}

export interface PostUpdate {
  content?: string
}

export interface PostUser {
  avatarUrl: string
  fullName: string
}

export interface Recover {
  email: string
}

export interface ResetPassword {
  /** @minLength 8 */
  newPassword: string
  token: string
}

export interface Token {
  accessToken: string
  tokenType: string
}

export interface User {
  avatarUrl: string
  biography: string
  birthdate: string
  coverUrl: string
  createdAt: string
  email: string
  fullName: string
  gender: string
  id: string
  isActive: boolean
  isSuperuser: boolean
  location: string
  updatedAt: string
}

export interface UserCreate {
  avatarUrl?: string
  biography?: string
  birthdate?: string
  coverUrl?: string
  email: string
  fullName?: string
  gender?: string
  isActive?: boolean
  isSuperuser?: boolean
  location?: string
  /** @minLength 8 */
  password: string
}

export interface UserUpdate {
  avatarUrl?: string
  biography?: string
  birthdate?: string
  coverUrl?: string
  fullName?: string
  gender?: string
  isActive?: boolean
  isSuperuser?: boolean
  location?: string
  /** @minLength 8 */
  password?: string
}

export interface ValidationError {
  detail: any
}

export interface V1AccountLoginCreatePayload {
  /** Username */
  username: string
  /** Password */
  password: string
}

export interface V1PostsListParams {
  /** User id */
  userId?: string
  /** Search */
  search?: string
  /**
   * Skip
   * @default 0
   */
  skip?: number
  /**
   * Limit
   * @default 20
   */
  limit?: number
}

export interface V1PostsHomeListParams {
  /** Search */
  search?: string
  /**
   * Skip
   * @default 0
   */
  skip?: number
  /**
   * Limit
   * @default 20
   */
  limit?: number
}

export interface V1UsersListParams {
  /** Follower id */
  followerId?: string
  /** Followed id */
  followedId?: string
  /** Search */
  search?: string
  /**
   * Skip
   * @default 0
   */
  skip?: number
  /**
   * Limit
   * @default 20
   */
  limit?: number
}
