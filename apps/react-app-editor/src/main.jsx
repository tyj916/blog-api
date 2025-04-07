import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css';
import './styles/index.css'
import MyRoutes from './Routes'

window.addEventListener('message', (e) => {
  if (e.origin !== import.meta.env.VITE_BLOG_APP_URL) {
    console.log('Origin is incorrect. Expected: ' + import.meta.env.VITE_BLOG_APP_URL + '; Received: ' + e.origin);
    return;
  } else {
    console.log('editor good to go');
  }

  const data = JSON.parse(e.data);
  // localStorage.setItem('jwt', data);
  console.log(data);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <iframe id='sharedStorage' src={import.meta.env.VITE_BLOG_APP_URL} style={{'display': 'none'}} onLoad={() => {
      const iframe = document.querySelector('#sharedStorage');
      iframe.contentWindow.postMessage(JSON.stringify({ type: 'getJwt' }), import.meta.env.VITE_BLOG_APP_URL);
    }}></iframe>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </StrictMode>,
)