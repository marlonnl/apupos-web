declare type PostsAPI = {
  id: number
  user: {
    id: number
    username: string
    first_name: string
    email: string
  }
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
  user: {
    id: number
    username: string
    name: string
    bio: string
    site: string
    location: string
  }
  tokens?: {
    access?: string
    refresh?: string
  }
}

declare type loginActionType = {
  id: number
  username: string
  name: string
  bio: string
  site: string
  location: string
}

declare type AuthTokenType = {
  access: string
  refresh: string
}

declare type RefreshTokenAPIResponse = {
  refreshed: boolean
}
