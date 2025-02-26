import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import MyRoutes from './Routes'

// the script is used to receive jwt from blog app
window.addEventListener("message", (e) => {
  if (e.origin !== import.meta.env.VITE_BLOG_APP_URL) {
    return;
  }

  const data = JSON.parse(e.data);
  if (data.message && data.message === 'logout') {
    localStorage.removeItem('jwt');
    return;
  }

  localStorage.setItem('jwt', data);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </StrictMode>,
)
