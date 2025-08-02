import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Post from './pages/Post'
import Register from './pages/Register'
import Login from './pages/Login'
import User from './pages/User'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:postId" element={<Post />} />
    <Route path="/user/:username" element={<User />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
)

export default Rotas
