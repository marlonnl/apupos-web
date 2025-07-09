import { Chat, Heart, ArrowRepeat, HeartFill } from 'react-bootstrap-icons'
import { ActionIconContainer } from './styles'
import { color } from '../../styles/colors'
import { useState } from 'react'

type Props = {
  action: 'like' | 'reply' | 'rt'
  count?: number
  active?: boolean
  onClick?: () => void
}

const ActionButton = ({
  action,
  count = 0,
  active = false,
  onClick
}: Props) => {
  const [counter, setCounter] = useState(count)
  const [isActive, setIsActive] = useState(active)

  const handleClick = (event: any) => {
    event.preventDefault()
    if (action === 'like') {
      if (isActive == true) {
        setCounter(counter - 1)
      } else {
        setCounter(counter + 1)
      }
      setIsActive(!isActive)
      console.log(counter, isActive)
    }
  }

  let actionElement
  if (action === 'like') {
    if (isActive == true) {
      actionElement = <HeartFill color={color.likeActive} />
    } else {
      actionElement = <Heart />
    }
  } else if (action === 'reply') {
    actionElement = <Chat />
  } else if (action === 'rt') {
    actionElement = <ArrowRepeat />
  }

  return (
    <>
      <ActionIconContainer onClick={onClick}>
        {actionElement}
        {counter > 0 ? counter : ''}
      </ActionIconContainer>
    </>
  )
}

export default ActionButton
