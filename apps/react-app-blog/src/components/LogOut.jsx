import { Navigate } from "react-router-dom";

function postLogOutMessage() {
  const iframe = document.querySelector('#shareJwt');
  iframe.contentWindow.postMessage(JSON.stringify({message: 'logout'}), import.meta.env.VITE_EDITOR_URL);
}

function LogOut() {
  localStorage.removeItem('jwt');
  postLogOutMessage();

  return <Navigate to='/' />
}

export default LogOut;