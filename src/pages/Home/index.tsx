import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthenticatedQuery } from '../../services/api_auth'

import { updateTokens } from '../../store/reducers/token'
import { authentication } from '../../store/reducers/auth'

import Feed from '../../components/Feed'
import Logo from '../../components/Logo'
import Sidebar from '../../components/Sidebar'
import Loader from '../../components/Loader'
import Config from '../../components/Config'

import { Content, Main } from '../../styles'

type Props = {
  content: 'feed' | 'config'
}

const Home = ({ content }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateTokens())

  const { isSuccess, data, status, isError, isFetching } =
    useAuthenticatedQuery()

  useEffect(() => {
    // fulfilled | rejected
    if (status === 'rejected') {
      navigate('/login')
    } else if (data) {
      const authData = {
        authenticated: true,
        user: data.user
      }

      dispatch(authentication(authData))
    }
  }, [status, navigate])

  if (isFetching) {
    return <Loader />
  }

  if (isError) {
    return <p>Ocorreu um erro inesperado. :(</p>
  }

  return (
    <div className="container">
      {isSuccess && (
        <Main>
          <Sidebar />
          <Content>
            <Logo />
            {content == 'feed' ? (
              <Feed showFeed={true} canPost={true} />
            ) : (
              <Config />
            )}
          </Content>
        </Main>
      )}
    </div>
  )
}

export default Home
