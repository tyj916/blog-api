import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/index";
import styles from '../styles/Header.module.css';

function Logo() {
  return (
    <Link to="/">
      <h1 className={styles.logo}>Logo</h1>
    </Link>
  );
}

function Menu() {
  if (isLoggedIn()) {
    return (
      <ul className={styles.menu}>
        <li><Link to="/">Home</Link></li>
        <li><Link to={import.meta.env.VITE_EDITOR_URL}>Write</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/logout'>Log Out</Link></li>
      </ul>
    );
  }

  return (
    <ul className={styles.menu}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/posts">Blog</Link></li>
      <li><Link to={import.meta.env.VITE_EDITOR_URL}>Write</Link></li>
      <li><Link 
        to={{
          pathname: 'login',
          search: `?from=${location.pathname}`
        }}>Log In</Link></li>
      <li><Link 
        to={{
          pathname: 'register',
          search: `?from=${location.pathname}`
        }}>Get Started</Link></li>
    </ul>
  );
}

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Logo />
        <Menu />
      </div>
    </header>
  );
}

export default Header;