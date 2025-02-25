import { useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  if (isLoggedIn()) {
    return (
      <ul className={styles.menu}>
        <li><Link to="/">Home</Link></li>
        <li><Link to={import.meta.env.VITE_EDITOR_URL}>Write</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
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
      <li><Link to="/">Home</Link></li>
      <li><Link to='register/writer' state={{prevPath: location.pathname}}>Write</Link></li>
      <li><Link to='login' state={{prevPath: location.pathname}}>Log In</Link></li>
      <li><Link to='register' state={{prevPath: location.pathname}}>Get Started</Link></li>
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