type Props = {
  url?: any
  page?: 'post' | 'profile'
}

const Avatar = ({ url, page }: Props) => {
  const generateAvatarElement = () => {
    return url ? <img src={url} /> : <img src="https://placecats.com/300/300" />
  }

  return generateAvatarElement()
}

export default Avatar
