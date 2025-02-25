import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import 'normalize.css';
import './styles/index.css'

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
const router = createBrowserRouter(routes);

// send jwt to editor app
function shareJwtWithEditorApp() {
  const jwt = localStorage.getItem('jwt');
  const iframe = document.querySelector('#shareJwt');
  iframe.contentWindow.postMessage(JSON.stringify(jwt), import.meta.env.VITE_EDITOR_URL);
}

root.render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* this iframe is used to share jwt with editor app */}
    <iframe id='shareJwt' src={import.meta.env.VITE_EDITOR_URL} style={{display: 'none'}} onLoad={shareJwtWithEditorApp}></iframe>
  </StrictMode>,
)
