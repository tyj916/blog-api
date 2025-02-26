import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import 'normalize.css';
import './styles/index.css'
import { isLoggedIn } from './utils';

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
const router = createBrowserRouter(routes);

// sync localStorage jwt with editor app
function postJwtMessage() {
  const iframe = document.querySelector('#shareLocalStorage');
  iframe.contentWindow.postMessage(JSON.stringify({
    message: isLoggedIn() ? 'login' : 'logout',
    jwt: localStorage.getItem('jwt'),
  }), import.meta.env.VITE_EDITOR_URL);
}

root.render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* this iframe is used to share localstorage with editor app */}
    <iframe id='shareLocalStorage' src={import.meta.env.VITE_EDITOR_URL} style={{display: 'none'}} onLoad={postJwtMessage}></iframe>
  </StrictMode>,
)
