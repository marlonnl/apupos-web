import { Bell, Gear, HouseDoorFill, Person } from 'react-bootstrap-icons'
import { LinkItem, LinkList, SidebarSection, UserBar } from './styles'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { useDoLogoutMutation } from '../../services/api_auth'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const { authenticated, user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )
  const [logout, { isSuccess }] = useDoLogoutMutation()
  const iconSize = 22

  const onLogout = async () => {
    console.log('logging out')
    await logout()
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess, navigate])

  return (
    <SidebarSection>
      <UserBar>
        <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
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
              <a href="#">
                <Gear size={iconSize} />
                <p>Configurações</p>
              </a>
            </LinkItem>
          </>
        )}
      </LinkList>
      <button onClick={onLogout}>Logout!</button>
    </SidebarSection>
  )
}

export default Sidebar
