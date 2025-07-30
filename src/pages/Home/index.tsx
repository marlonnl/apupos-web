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

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(updateTokens())

  const { access, refresh: refreshed } = useSelector(
    (state: RootReducer) => state.tokenSlice
  )
  const { isLogged } = useSelector((state: RootReducer) => state.authSlice)

  const { isSuccess, data, status } = useAuthenticatedQuery()

  useEffect(() => {
    // fulfilled | rejected
    if (status === 'rejected') {
      navigate('/login')
    } else {
      // solicitar os dados do usuário
    }
  }, [status, navigate])

  return (
    <div className="container">
      {isSuccess && (
        <Main>
          <Sidebar />
          <Content>
            <Logo />
            <Feed />
          </Content>
        </Main>
      )}
    </div>
  )
}

export default Home
