import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import 'normalize.css';
import './styles/index.css'
import { postJwtMessage } from './utils';

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
const router = createBrowserRouter(routes);

root.render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* this iframe is used to share localstorage with editor app */}
    <iframe id='shareLocalStorage' src={import.meta.env.VITE_EDITOR_URL} style={{display: 'none'}} onLoad={postJwtMessage}></iframe>
  </StrictMode>,
)
