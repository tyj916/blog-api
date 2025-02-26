function getCurrentUsername() {
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  return jwt.username;
}

export {
  getCurrentUsername,
}