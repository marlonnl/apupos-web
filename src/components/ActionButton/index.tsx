import { useState } from 'react'

import { Heart, ArrowRepeat, HeartFill, Link45deg } from 'react-bootstrap-icons'

import { ActionIconContainer } from './styles'
import { color } from '../../styles/colors'

type Props = {
  action: 'like' | 'reply' | 'rt'
  count?: number
  active?: boolean
  onClick?: (e: React.MouseEvent) => void
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
      // console.log(counter, isActive)
    }
  }

  let actionElement
  if (action === 'like') {
    if (isActive == true) {
      actionElement = (
        <HeartFill title="Curtir postagem" color={color.likeActive} />
      )
    } else {
      actionElement = <Heart />
    }
  } else if (action === 'reply') {
    actionElement = <Link45deg title="Ir para a página do post" />
  } else if (action === 'rt') {
    actionElement = <ArrowRepeat title="Repupar a postagem" />
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
