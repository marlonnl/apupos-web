import { useEffect, useState } from 'react'
import { Characters, ComposeForm, SidePanel } from './styles'
import {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetUserFeedQuery
} from '../../services/api'
import { MAX_LENGTH } from '../../utils'

const Compose = () => {
  const [newApupo, setNewApupo] = useState('')
  const [canPost, setCanPost] = useState(true)
  const [charsLeft, setCharsLeft] = useState<number>(MAX_LENGTH)

  const [createPostMutation, { isSuccess }] = useCreatePostMutation()
  const { refetch } = useGetUserFeedQuery({ pageNumber: 1 })

  // submit new post
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) => {
    e.preventDefault()

    const newPostData: Omit<PostsAPI, 'id' | 'parent' | 'created_at' | 'user'> =
      {
        content: content,
        likes: 0,
        is_retweet: false
      }

    createPostMutation(newPostData)
    // clear input field
    setNewApupo('')
  }

  useEffect(() => {
    refetch()
  }, [isSuccess, refetch])

  // verifica se a nova postagem está dentro do limite de caracteres
  useEffect(() => {
    setCharsLeft(MAX_LENGTH - newApupo.length)

    if (newApupo.length > MAX_LENGTH) {
      if (canPost === true) {
        setCanPost(false)
      }
    } else if (canPost === false && newApupo.length <= MAX_LENGTH) {
      setCanPost(true)
    }
  }, [newApupo, canPost])

  return (
    <ComposeForm>
      <form>
        <textarea
          // type="text"
          name="apupo"
          id=""
          required={true}
          value={newApupo}
          onChange={(e) => setNewApupo(e.target.value)}
          placeholder="O que está acontecendo?"
        />
        <SidePanel>
          <Characters lenght={charsLeft}>{charsLeft}</Characters>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, newApupo)}
            disabled={!canPost}
          >
            apupe
          </button>
        </SidePanel>
      </form>
    </ComposeForm>
  )
}

export default Compose
