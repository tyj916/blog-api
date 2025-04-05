import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css';
import './styles/index.css'
import MyRoutes from './Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </StrictMode>,
)

window.addEventListener('load', () => {
  window.parent.postMessage("Start listening...", import.meta.env.VITE_BLOG_APP_URL)
});

// the script is used to sync localStorage with blog app
window.addEventListener("message", (e) => {
  if (e.origin !== import.meta.env.VITE_BLOG_APP_URL) {
    console.log(`Invalid message origin: ${e.origin}, ${import.meta.VITE_BLOG_APP_URL}`);
    return;
  }

  const data = JSON.parse(e.data);
  if (data.message === 'login') {
    localStorage.setItem('jwt', JSON.stringify(data.jwt));
    return;
  }

  if (data.message === 'logout') {
    localStorage.removeItem('jwt');
    return;
  }
});