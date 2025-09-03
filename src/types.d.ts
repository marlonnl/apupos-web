declare type Pagination = {
  count: number
  next: string | null
  previous: string | null
  results: PostsAPI[]
}

declare type ProfileType = {
  id: number
  username: string
  first_name: string
  bio: string
  site: string
  location: string
  following_count: number
  followers_count: number
  posts: number
  image: string
}

declare type PostsAPI = {
  id: number
  user: ProfileType
  content: string
  likes: number
  is_retweet?: boolean
  parent?: {
    id: number
    content: string
    likes: number
    user: ProfileType
  }
  created_at: string
  is_liked?: boolean
}

declare type loginResponseType = {
  user: ProfileType
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
