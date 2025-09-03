import {
  Bell,
  Gear,
  HouseDoorFill,
  Person,
  PersonFillX,
  PersonX,
  ToggleOff
} from 'react-bootstrap-icons'
import { LinkItem, LinkList, SidebarSection, UserBar } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { useDoLogoutMutation } from '../../services/api_auth'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/reducers/auth'
import Avatar from '../Avatar'

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authenticated, user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )
  const [doLogout, { isSuccess }] = useDoLogoutMutation()
  const iconSize = 22

  const onLogout = async () => {
    console.log('logging out')
    await doLogout()

    if (isSuccess) {
      dispatch(logout())
      navigate('/login')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess, navigate])

  return (
    <SidebarSection>
      <UserBar>
        <Avatar url={userStateData?.image ? userStateData?.image : 'null'} />
        <div>
          <h3>
            <b>{userStateData?.first_name}</b>
          </h3>
          <p>@{userStateData?.username}</p>
        </div>
      </UserBar>

      <LinkList>
        <LinkItem>
          <Link to={'/'}>
            <HouseDoorFill size={iconSize} />
            <p>
              <b>Home</b>
            </p>
          </Link>
        </LinkItem>
        {userStateData && (
          <>
            <LinkItem>
              <a href="#">
                <Bell size={iconSize} />
                <p>Notificações</p>
              </a>
            </LinkItem>
            <LinkItem>
              <Link to={`/user/${userStateData?.username}`}>
                <Person size={iconSize} />
                <p>Perfil</p>
              </Link>
            </LinkItem>
            <LinkItem>
              <Link to="/config">
                <Gear size={iconSize} />
                <p>Configurações</p>
              </Link>
            </LinkItem>
          </>
        )}
      </LinkList>
      <hr></hr>
      <LinkList>
        <LinkItem>
          <button onClick={onLogout}>
            <PersonX />
            Logout
          </button>
        </LinkItem>
      </LinkList>
      {/* <button onClick={onLogout}>Logout!</button> */}
    </SidebarSection>
  )
}

export default Sidebar
