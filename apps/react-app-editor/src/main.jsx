import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css';
import './styles/index.css'
import MyRoutes from './Routes'

// the script is used to sync localStorage with blog app
window.addEventListener("message", (e) => {
  if (
    e.origin === import.meta.env.VITE_BLOG_APP_URL
    || e.origin === import.meta.env.VITE_BLOG_APP_URL + '/'
  ) {
    const data = JSON.parse(e.data);
    if (data.message === 'login') {
      localStorage.setItem('jwt', data.jwt);
      return;
    }

    if (data.message === 'logout') {
      localStorage.removeItem('jwt');
      return;
    }
  } else {
    console.log(`Invalid message origin: ${e.origin}, ${import.meta.VITE_BLOG_APP_URL}`);
    return;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </StrictMode>,
)
