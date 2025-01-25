import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Post from './components/Post.jsx'
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx'
import NotFound from './components/error/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/posts/:postId', element: <Post />, errorElement: <NotFound /> },
      { path: '/profile', element: <Profile /> },
      { path: '/profile/:userId', element: <Profile />, errorElement: <NotFound /> },
    ]
  },
]);

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <div id='modal-container'></div>
  </StrictMode>,
)
