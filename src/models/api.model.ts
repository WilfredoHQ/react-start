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
  detail?: string
}

export interface Follow {
  createdAt?: string
  followedId: string
  followerId: string
  id?: string
  updatedAt?: string
}

export interface FollowCreate {
  followedID: string
}

export interface Msg {
  msg?: string
}

export interface Post {
  content: string
  createdAt?: string
  id?: string
  updatedAt?: string
  userId: string
}

export interface PostCreate {
  content: string
}

export interface PostUpdate {
  content?: string
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
  accessToken?: string
  tokenType?: string
}

export interface User {
  createdAt?: string
  email: string
  fullName?: string
  id?: string
  isActive?: boolean
  isSuperuser?: boolean
  updatedAt?: string
}

export interface UserCreate {
  email: string
  fullName?: string
  isActive?: boolean
  isSuperuser?: boolean
  /** @minLength 8 */
  password: string
}

export interface UserUpdate {
  fullName?: string
  isActive?: boolean
  isSuperuser?: boolean
  /** @minLength 8 */
  password?: string
}

export interface ValidationError {
  detail?: any
}

export interface V1AccountLoginCreatePayload {
  /** Username */
  username: string
  /** Password */
  password: string
}

export interface V1FollowsListParams {
  /** Follower Id */
  followerId?: string
  /** Followed Id */
  followedId?: string
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

export interface V1PostsListParams {
  /** User Id */
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
  /** Follower Id */
  followerId?: string
  /** Followed Id */
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
