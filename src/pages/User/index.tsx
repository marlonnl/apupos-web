import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Main } from '../../styles'
import {
  UserBio,
  UserContainer,
  UserHeader,
  UserHeaderNavbar,
  UserHeaderNavContainer,
  UserInfo,
  UserInfoItem
} from './styles'
import {
  ArrowLeft,
  PersonFillAdd,
  PersonLinesFill
} from 'react-bootstrap-icons'

const User = () => {
  const { username } = useParams()

  return (
    <div className="container">
      <Main>
        <Sidebar />
        <UserContainer>
          <UserHeader>
            <div style={{ marginBottom: '16px' }}>
              <ArrowLeft size={22} />
            </div>
            <UserHeaderNavContainer>
              <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
              <UserHeaderNavbar>
                <button>
                  <PersonLinesFill /> editar perfil
                </button>
                <button>
                  <PersonFillAdd /> seguir
                </button>
                <button>...</button>
              </UserHeaderNavbar>
            </UserHeaderNavContainer>
          </UserHeader>
          <UserInfo>
            <h2>NOME DO USUARIO</h2>
            <div>
              <h3>@{username}</h3>
              <span className="doesfollow">segue você</span>
            </div>
            <UserInfoItem>
              <a href="#">
                <span className="number">0</span>
                <span>&nbsp;seguidores</span>
              </a>
              <a href="#">
                <span className="number">0</span>
                <span>&nbsp;seguindo</span>
              </a>
              <a href="#">
                <span className="number">0</span>
                <span>&nbsp;apupos</span>
              </a>
            </UserInfoItem>
            <UserBio>asaaaaaaaaaa</UserBio>
          </UserInfo>
        </UserContainer>
      </Main>
    </div>
  )
}

export default User
