import { Navigate, Outlet } from "react-router-dom";

function isJwtExpired(jwt) {
  const expiryTime = (7 * 24 * 60 * 60 * 1000) - (new Date() - new Date(jwt.timestamp));
  return expiryTime > 0;
}

function isLoggedIn() {
  if (!localStorage.getItem('jwt')) {
    return false;
  }

  const jwt = JSON.parse(localStorage.getItem('jwt'));
  return isJwtExpired(jwt);
}

function AuthenticationRoute() {
  if (isLoggedIn()) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />
  }
}

export default AuthenticationRoute;