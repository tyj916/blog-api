import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Post from './components/Post.jsx'
import PostList from './components/PostList.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <PostList /> },
      { path: '/posts/:postId', element: <Post /> }
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
