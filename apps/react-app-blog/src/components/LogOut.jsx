import { Navigate } from "react-router-dom";

function LogOut() {
  localStorage.removeItem('jwt');

  return <Navigate to='/' />
}

export default LogOut;