import { useDispatch, useSelector } from 'react-redux'
import Feed from '../../components/Feed'
import Logo from '../../components/Logo'
import Sidebar from '../../components/Sidebar'
import { Content, Main } from '../../styles'
import { RootReducer } from '../../store'
import { updateTokens } from '../../store/reducers/token'
import { useAuthenticatedQuery } from '../../services/api_auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { authentication, authState } from '../../store/reducers/auth'
import Compose from '../../components/Compose'
import Config from '../../components/Config'

type Props = {
  content: 'feed' | 'config'
}

const Home = ({ content }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateTokens())

  const { access, refresh: refreshed } = useSelector(
    (state: RootReducer) => state.tokenSlice
  )
  const { authenticated, user: userState } = useSelector(
    (state: RootReducer) => state.authSlice
  )

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
      // navigate('/')
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
