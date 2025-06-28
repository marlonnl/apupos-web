import { FormEvent, useState } from 'react'
import { ComposeForm } from './styles'

const Compose = () => {
  const [newApupo, setNewApupo] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    // clear input field
    setNewApupo('')
  }

  return (
    <ComposeForm>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="apupo"
          id=""
          required={true}
          value={newApupo}
          onChange={(e) => setNewApupo(e.target.value)}
          placeholder="O que está acontecendo?"
        />
        <button type="submit">apupe</button>
      </form>
    </ComposeForm>
  )
}

export default Compose
