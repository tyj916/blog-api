import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Editor from './components/Editor.jsx';
import NotFound from './components/error/NotFound.jsx';
import AuthenticationForm from './components/Authentication.jsx';
import { isLoggedIn } from './utils/index.js';

function ProtectedRoute() {
  if (isLoggedIn()) {
    return <Outlet />
  } else {
    return <Navigate to='/login' />;
  }
}

function AuthenticationRoute() {
  if (isLoggedIn()) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />
  }
}

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
      <Route element={<AuthenticationRoute />}>
        <Route path='/login' element={<AuthenticationForm type='login' text='Welcome Back.' />} />
        <Route path='/register' element={<AuthenticationForm type='signUp' text='Create an account to start writing.' />} />
      </Route>
    </Routes>
  )
}

export default MyRoutes;
