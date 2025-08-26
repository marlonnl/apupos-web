import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/Home'
import Post from './pages/Post'
import Register from './pages/Register'
import Login from './pages/Login'
import User from './pages/User'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthenticatedQuery } from './services/api_auth'
import { authentication } from './store/reducers/auth'

const Rotas = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isSuccess, data, status, isError, isFetching } =
    useAuthenticatedQuery()

  useEffect(() => {
    if (status === 'rejected') {
      navigate('/login')
    } else if (data) {
      const authData = {
        authenticated: true,
        user: data.user
      }

      dispatch(authentication(authData))
    }
  }, [data])

  return (
    <Routes>
      <Route path="/" element={<Home content="feed" />} />
      <Route path="/config" element={<Home content="config" />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/user/:username" element={<User />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Rotas
