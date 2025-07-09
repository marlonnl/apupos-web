import { useState } from 'react'
import { ComposeForm } from './styles'
import { useCreatePostMutation, useGetPostsQuery } from '../../services/api'

const Compose = () => {
  const [newApupo, setNewApupo] = useState('')
  const [createPostMutation, { isSuccess }] = useCreatePostMutation()
  const { refetch } = useGetPostsQuery()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) => {
    e.preventDefault()

    const newPostData: Omit<PostsAPI, 'id' | 'parent' | 'created_at'> = {
      content: content,
      likes: 0,
      is_retweet: false
    }

    createPostMutation(newPostData)
    refetch()

    // clear input field
    setNewApupo('')
  }

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
        <button type="submit" onClick={(e) => handleSubmit(e, newApupo)}>
          apupe
        </button>
      </form>
    </ComposeForm>
  )
}

export default Compose
