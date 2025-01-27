import { Navigate } from 'react-router-dom';
import App from './App.jsx'
import Post from './components/Post.jsx'
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx'
import NotFound from './components/error/NotFound.jsx';
import Unauthorized from './components/error/Unauthorized.jsx';
import AuthenticationForm from './components/Authentication.jsx';
import { isLoggedIn } from './utils/index.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/posts/:postId', element: <Post />, errorElement: <NotFound /> },
      { 
        path: '/profile', 
        element: isLoggedIn() ? <Profile /> : <Navigate to='/login' />, 
        errorElement: <Unauthorized /> 
      },
      { path: '/profile/:username', element: <Profile />, errorElement: <NotFound /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/login', 
    element: <AuthenticationForm type='login' text='Welcome Back.' />
  },
  {
    path: '/register',
    element: <AuthenticationForm type='signUp' text='Join Us.' />
  },
  { 
    path: '/register/writer', 
    element: <AuthenticationForm type='signUp' text='Create an account to start writing.' /> 
  },
];

export default routes;