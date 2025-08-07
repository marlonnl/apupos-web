import { Link, useParams } from 'react-router-dom'
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
  PersonFillDash,
  PersonLinesFill
} from 'react-bootstrap-icons'
import { useState } from 'react'
import EditProfile from '../../components/EditProfile'
import { useGetProfileQuery } from '../../services/api_profile'

const User = () => {
  const { username } = useParams() as { username: string }

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const { data } = useGetProfileQuery(username)

  function onClickEditProfile() {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleFollow = async () => {
    const a = 1
  }

  return (
    <>
      <div
        className="container"
        style={modalVisible ? { opacity: '0.3' } : { opacity: '1' }}
      >
        <Main>
          <Sidebar />
          <UserContainer>
            {data && (
              <>
                <UserHeader>
                  <div style={{ marginBottom: '16px' }}>
                    <Link to="/">
                      <ArrowLeft size={22} />
                    </Link>
                  </div>
                  <UserHeaderNavContainer>
                    <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
                    <UserHeaderNavbar>
                      <button onClick={onClickEditProfile}>
                        <PersonLinesFill /> editar perfil
                      </button>
                      <button onClick={handleFollow}>
                        {!isFollowing ? (
                          <>
                            <PersonFillAdd /> seguir
                          </>
                        ) : (
                          <>
                            <PersonFillDash /> deixar de seguir
                          </>
                        )}
                      </button>
                      <button>...</button>
                    </UserHeaderNavbar>
                  </UserHeaderNavContainer>
                </UserHeader>
                <UserInfo>
                  <h2>{data[0].name}</h2>
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
                  <UserBio>{data[0].bio}</UserBio>
                </UserInfo>
              </>
            )}
          </UserContainer>
        </Main>
      </div>
      <div>{modalVisible && <EditProfile />}</div>
    </>
  )
}

export default User
