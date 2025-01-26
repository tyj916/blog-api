import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Post from './components/Post.jsx'
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx'
import NotFound from './components/error/NotFound.jsx';
import Unauthorized from './components/error/Unauthorized.jsx';
import AuthenticationForm from './components/Authentication.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <AuthenticationForm type='login' text='Welcome Back.' /> },
      { path: '/register', element: <AuthenticationForm type='signUp' text='Join Us.' /> },
      { path: '/register/writer', element: <AuthenticationForm type='signUp' text='Create an account to start writing.' /> },
      { path: '/posts/:postId', element: <Post />, errorElement: <NotFound /> },
      { path: '/profile', element: <Profile />, errorElement: <Unauthorized /> },
      { path: '/profile/:username', element: <Profile />, errorElement: <NotFound /> },
    ]
  },
]);

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
