import { Bell, Gear, HouseDoorFill, Person } from 'react-bootstrap-icons'
import { LinkItem, LinkList, SidebarSection, UserBar } from './styles'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const Sidebar = () => {
  const { isLogged, user } = useSelector(
    (state: RootReducer) => state.authSlice
  )
  const iconSize = 22

  return (
    <SidebarSection>
      <UserBar>
        <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
        <div>
          <h3>
            <b>nome do user</b>
          </h3>
          <p>@{user?.username}</p>
        </div>
      </UserBar>

      <LinkList>
        <LinkItem>
          <a href="#">
            <HouseDoorFill size={iconSize} />
            <p>
              <b>Home</b>
            </p>
          </a>
        </LinkItem>
        <LinkItem>
          <a href="#">
            <Bell size={iconSize} />
            <p>Notificações</p>
          </a>
        </LinkItem>
        <LinkItem>
          <a href="#">
            <Person size={iconSize} />
            <p>Perfil</p>
          </a>
        </LinkItem>
        <LinkItem>
          <a href="#">
            <Gear size={iconSize} />
            <p>Configurações</p>
          </a>
        </LinkItem>
      </LinkList>
    </SidebarSection>
  )
}

export default Sidebar
