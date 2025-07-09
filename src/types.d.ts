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
