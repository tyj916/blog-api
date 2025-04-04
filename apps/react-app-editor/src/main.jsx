import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css';
import './styles/index.css'
import MyRoutes from './Routes'

// the script is used to sync localStorage with blog app
window.addEventListener("message", (e) => {
  const originURL = e.origin.charAt(e.origin.length - 1) === '/' ? e.origin : e.origin + '/';
  alert(originURL);
  if (originURL !== import.meta.env.VITE_BLOG_APP_URL + '/') {
    alert('rejected');
    return;
  }

  const data = JSON.parse(e.data);
  if (data.message === 'login') {
    localStorage.setItem('jwt', data.jwt);
    return;
  }

  if (data.message === 'logout') {
    localStorage.removeItem('jwt');
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
