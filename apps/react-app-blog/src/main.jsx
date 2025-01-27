import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './index.css'

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
