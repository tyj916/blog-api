import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Editor from './components/Editor.jsx';
import NotFound from './components/error/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Post from './components/Post.jsx';

function MyRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path='new' element={<Editor />} />
          <Route path='posts/:postId' element={<Post />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MyRoutes;