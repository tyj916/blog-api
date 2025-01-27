import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils";

function ProtectedRoutes() {
  if (isLoggedIn()) {
    return <Outlet />
  } else {
    return <Navigate to='/login' />
  }
}

export default ProtectedRoutes;