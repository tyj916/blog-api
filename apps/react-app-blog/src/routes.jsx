import App from './App.jsx'
import Post from './components/Post.jsx'
import BlogPosts from './components/BlogPosts.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx'
import NotFound from './components/error/NotFound.jsx';
import AuthenticationForm from './components/Authentication.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import LogOut from './components/LogOut.jsx';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/posts', element: <BlogPosts />, errorElement: <NotFound /> },
      { path: '/posts/:postId', element: <Post />, errorElement: <NotFound /> },
      { path: '/profile/:username', element: <Profile />, errorElement: <NotFound /> },
      { 
        element: <ProtectedRoutes />,
        children: [
          { path: '/profile', element: <Profile /> }
        ],
       },
      { path: '*', element: <NotFound />},
    ],
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
  {
    path: '/logout',
    element: <LogOut />,
  },
];

export default routes;