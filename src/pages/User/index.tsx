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
import Feed from '../../components/Feed'

const User = () => {
  const { username } = useParams() as { username: string }
  const { user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )

  const [isMe, setIsMe] = useState<boolean>()

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>()

  const { data, isSuccess, refetch } = useGetProfileQuery(username)
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
      await followAction({ username, action: followState })

      if (followSuccess) {
        console.log('alterando...', isFollowing)
        setIsFollowing(!isFollowing)
        console.log('alterado...', isFollowing)
        refetch()
      }
    } catch (error) {
      console.log('follow error', error)
    }
  }

  const doFollowState = () => {
    if (isFollowing == undefined) {
      setIsFollowing(data?.is_following)
      console.log('undefeined!!!', data?.is_following)
    }

    if (isSuccess) {
      if (data.is_following == false) {
        setIsFollowing(false)
      } else if (data.is_following == true) {
        setIsFollowing(true)
      }

      console.log('function follow state', isFollowing, data.is_following)
    }
  }

  useEffect(() => {
    setIsMe(username == userStateData?.username)
    // setIsFollowing(!isFollowing)
  }, [data, isSuccess, isFollowing])

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
                      {isMe ? (
                        <button onClick={onClickEditProfile}>
                          <PersonLinesFill /> editar perfil
                        </button>
                      ) : !data.is_following ? (
                        <button onClick={() => handleFollow()}>
                          <PersonFillAdd /> seguir
                        </button>
                      ) : (
                        <button onClick={() => handleFollow()}>
                          <PersonFillDash /> deixar de seguir
                        </button>
                      )}
                      {/* {!isMe &&
                        (!data.is_following ? (
                          <button onClick={() => handleFollow()}>
                            <PersonFillAdd /> seguir
                          </button>
                        ) : (
                          <button onClick={() => handleFollow()}>
                            <PersonFillDash /> deixar de seguir
                          </button>
                        ))} */}
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
            <Feed usernameFeed={username} showFeed={false} />
          </UserContainer>
        </Main>
      </div>
      <div>{modalVisible && <EditProfile />}</div>
    </>
  )
}

export default User
