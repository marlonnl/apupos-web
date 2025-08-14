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
import { useEffect, useState } from 'react'
import EditProfile from '../../components/EditProfile'
import {
  FollowProfile,
  useFollowMutation,
  useGetProfileQuery
} from '../../services/api_profile'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const User = () => {
  const dispatch = useDispatch()
  const { username } = useParams() as { username: string }
  const { user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )

  const isMe = username == userStateData?.username

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>()

  const { data, isSuccess } = useGetProfileQuery(username)
  const [followAction, { isSuccess: followSuccess }] = useFollowMutation()

  function onClickEditProfile() {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleFollow = async () => {
    const followState: 'follow' | 'unfollow' = isFollowing
      ? 'unfollow'
      : 'follow'

    try {
      // console.log('followstate ', followState)
      await followAction({ username, action: followState })

      if (followSuccess) {
        console.log('alterando...', isFollowing)
        setIsFollowing(!isFollowing)
        console.log('alterado...', isFollowing)
      }
    } catch (error) {
      console.log('follow error', error)
    }
  }

  useEffect(() => {
    console.log('user detail: ', data)
    if (data) {
      setIsFollowing(data.is_following)
      console.log('isFollowing', isFollowing)
      console.log('isMe', isMe)
    }
  }, [data, isSuccess])

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
                      {isMe && (
                        <button onClick={onClickEditProfile}>
                          <PersonLinesFill /> editar perfil
                        </button>
                      )}
                      {!isMe && (
                        <button onClick={() => handleFollow()}>
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
                      )}
                      <button>...</button>
                    </UserHeaderNavbar>
                  </UserHeaderNavContainer>
                </UserHeader>
                <UserInfo>
                  <h2>{data.profile.first_name}</h2>
                  <div>
                    <h3>@{username}</h3>
                    {data.follows_me && (
                      <span className="doesfollow">segue você</span>
                    )}
                  </div>
                  <UserInfoItem>
                    <a href="#">
                      <span className="number">
                        {data.profile.followers_count}
                      </span>
                      <span>&nbsp;seguidores</span>
                    </a>
                    <a href="#">
                      <span className="number">
                        {data.profile.following_count}
                      </span>
                      <span>&nbsp;seguindo</span>
                    </a>
                    <a href="#">
                      <span className="number">0</span>
                      <span>&nbsp;apupos</span>
                    </a>
                  </UserInfoItem>
                  <UserBio>{data.profile.bio}</UserBio>
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
