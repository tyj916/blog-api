import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import 'normalize.css';
import './styles/index.css'

window.addEventListener('message', (e) => {
  if (e.origin !== import.meta.env.VITE_EDITOR_URL) {
    console.log('Origin is incorrect. Expected: ' + import.meta.env.VITE_EDITOR_URL + '; Received: ' + e.origin);
    return;
  } else {
    console.log('blog app good to go');
  }

  const data = JSON.parse(e.data);
  if (data.type === 'getJwt') {
    const jwt = localStorage.getItem('jwt');
    e.source.postMessage(JSON.stringify(jwt), '*');
  }
});

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
const router = createBrowserRouter(routes);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)