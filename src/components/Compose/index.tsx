import { useState } from 'react'
import { ComposeForm } from './styles'
import { useCreatePostMutation } from '../../services/api'

const Compose = () => {
  const [newApupo, setNewApupo] = useState('')
  const [createPostMutation, { data }] = useCreatePostMutation()

  const handleSubmit = (content: string) => {
    // event.preventDefault()

    const newPostData: Omit<PostsAPI, 'id' | 'parent'> = {
      content: content,
      likes: 0,
      is_retweet: false
    }

    createPostMutation(newPostData)
    // clear input field
    setNewApupo('')
  }

  return (
    <ComposeForm>
      <form>
        <input
          type="text"
          name="apupo"
          id=""
          required={true}
          value={newApupo}
          onChange={(e) => setNewApupo(e.target.value)}
          placeholder="O que está acontecendo?"
        />
        <button type="submit" onClick={() => handleSubmit(newApupo)}>
          apupe
        </button>
      </form>
    </ComposeForm>
  )
}

export default Compose
