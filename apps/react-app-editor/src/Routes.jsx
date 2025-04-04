import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Editor from './components/Editor.jsx';
import NotFound from './components/error/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthenticationForm from './components/Authentication.jsx';

function MyRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path='new' element={<Editor />} />
          <Route path='posts'>
            <Route path=':postId/edit' element={<Editor />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
      <Route path='/login' element={<AuthenticationForm type='login' text='Welcome Back.' />} />
      <Route path='/register' element={<AuthenticationForm type='signUp' text='Create an account to start writing.' />} />
    </Routes>
  )
}

export default MyRoutes;