import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Post from './pages/Post'
import Register from './pages/Register'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:postId" element={<Post />} />
    <Route path="/register" element={<Register />} />
  </Routes>
)

export default Rotas
