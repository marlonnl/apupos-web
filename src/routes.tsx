import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Post from './pages/Post'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:postId" element={<Post />} />
  </Routes>
)

export default Rotas
