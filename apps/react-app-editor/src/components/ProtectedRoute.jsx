import { Outlet } from "react-router-dom";

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

function ProtectedRoute() {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    window.location.href = import.meta.env.VITE_BLOG_APP_URL + '/login/?from=' + window.location.href;
  }
}

export default ProtectedRoute;