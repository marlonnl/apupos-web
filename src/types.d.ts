declare type PostsAPI = {
  id: number
  content: string
  likes: number
  is_retweet?: boolean
  parent?: {
    id: number
    content: string
    likes: number
  }
  created_at: string
}

declare type loginResponseType = {
  id: number
  username: string
  email: string
  tokens?: {
    access?: string
    refresh?: string
  }
}

declare type loginActionType = {
  id: number
  username: string
  email: string
}

declare type AuthTokenType = {
  access: string
  refresh: string
}

declare type RefreshTokenAPIResponse = {
  refreshed: boolean
}
