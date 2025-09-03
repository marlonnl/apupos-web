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
  Link45deg,
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
import FollowList from '../../components/FollowList'
import Avatar from '../../components/Avatar'

const User = () => {
  const profileContent = ''

  const { username } = useParams() as { username: string }
  const { user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )

  const [isMe, setIsMe] = useState<boolean>(username == userStateData?.username)

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [followersList, setFollowersList] = useState<boolean>(false)
  const [followingList, setFollowingList] = useState<boolean>(false)

  const [isFollowing, setIsFollowing] = useState<boolean>()

  const { data, isSuccess, refetch } = useGetProfileQuery(username)
  const [followAction, { isSuccess: followSuccess }] = useFollowMutation()

  function onClickEditProfile() {
    setModalVisible(true)
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

  // const doFollowState = () => {
  //   if (isFollowing == undefined) {
  //     setIsFollowing(data?.is_following)
  //     console.log('undefeined!!!', data?.is_following)
  //   }

  //   if (isSuccess) {
  //     if (data.is_following == false) {
  //       setIsFollowing(false)
  //     } else if (data.is_following == true) {
  //       setIsFollowing(true)
  //     }

  //     console.log('function follow state', isFollowing, data.is_following)
  //   }
  // }

  useEffect(() => {
    setIsMe(username == userStateData?.username)
    // setIsFollowing(!isFollowing)
  }, [data, isSuccess, isFollowing])

  const showModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)

    refetch()
  }

  const checkContent = () => {
    if (!followersList && !followingList) {
      return <Feed usernameFeed={username} showFeed={false} />
    }

    if (followersList) {
      return <FollowList list={data?.follow.followers} title="Seguidores" />
    }

    if (followingList) {
      return <FollowList list={data?.follow.following} title="Seguindo" />
    }
  }

  const handleFollowersList = (mode: any) => {
    setModalVisible(false)

    if (mode === 'follower') {
      setFollowersList(true)
      setFollowingList(false)
    } else if (mode === 'following') {
      setFollowersList(false)
      setFollowingList(true)
    } else if (mode === 'feed') {
      setFollowersList(false)
      setFollowingList(false)
    }

    checkContent()
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
                  <div
                    style={{
                      marginBottom: '16px',
                      display: 'flex',
                      gap: '24px'
                    }}
                  >
                    <Link to="/">
                      <ArrowLeft size={22} />
                    </Link>
                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      Perfil
                    </p>
                  </div>
                  <UserHeaderNavContainer>
                    <Avatar url={data.profile.image} page="profile" />
                    <UserHeaderNavbar>
                      {isMe ? (
                        <button>
                          <Link to="/config/">
                            <PersonLinesFill /> editar perfil
                          </Link>
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
                    <a onClick={() => handleFollowersList('follower')}>
                      <span className="number">
                        {data.profile.followers_count}
                      </span>
                      <span>&nbsp;seguidores</span>
                    </a>
                    <a onClick={() => handleFollowersList('following')}>
                      <span className="number">
                        {data.profile.following_count}
                      </span>
                      <span>&nbsp;seguindo</span>
                    </a>
                    <a onClick={() => handleFollowersList('feed')}>
                      <span className="number">{data.profile.posts}</span>
                      <span>&nbsp;apupos</span>
                    </a>
                  </UserInfoItem>
                  <UserBio>{data.profile.bio}</UserBio>
                  <UserBio>
                    <Link45deg />
                    <a
                      href={data.profile.site}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {data.profile.site}
                    </a>
                  </UserBio>
                </UserInfo>
              </>
            )}
            {/* <Feed usernameFeed={username} showFeed={false} /> */}
            {checkContent()}
          </UserContainer>
        </Main>
      </div>
      <div>
        {/* {modalVisible && (
          <EditProfile username={username} onClick={closeModal} />
        )} */}
        {/* {followersList && <FollowList list={data?.follow.followers} />}
        {followingList && <FollowList list={data?.follow.following} />} */}
      </div>
    </>
  )
}

export default User
