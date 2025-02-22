import { useNavigate, Link } from "react-router-dom";
import { isLoggedIn } from "../utils/index";
import styles from '../styles/Header.module.css';

function Logo() {
  return (
    <a href="/">
      <h1 className={styles.logo}>Logo</h1>
    </a>
  );
}

function Menu() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  if (isLoggedIn()) {
    return (
      <ul className={styles.menu}>
        <li><a href="/">Home</a></li>
        <li><a href="/write">Write</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li>
          <button onClick={logOut} className={styles.linkButton}>
            Log Out
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className={styles.menu}>
      <li><a href="/">Home</a></li>
      <li><Link to='register/writer'>Write</Link></li>
      <li><Link to='login'>Log In</Link></li>
      <li><Link to='register'>Get Started</Link></li>
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