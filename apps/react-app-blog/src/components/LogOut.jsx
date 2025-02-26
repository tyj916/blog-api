function LogOut() {
  localStorage.removeItem('jwt');
  window.location.href = '/';
}

export default LogOut;