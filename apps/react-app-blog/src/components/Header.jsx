import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/index";
import styles from '../styles/Header.module.css';
import useWindowDimensions from "../utils/windowDimension";
import { useState } from "react";

function Logo() {
  return (
    <Link to="/">
      <h1 className={styles.logo}>Logo</h1>
    </Link>
  );
}

function ToggleMenuButton({hideMenu, setHideMenu}) {
  function handleToggle(e) {
    e.preventDefault();
    setHideMenu(!hideMenu);
  }

  return (
    <button className={styles.toggleMenuButton} onClick={handleToggle}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
}

function Links() {
  if (isLoggedIn()) {
    return (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to={import.meta.env.VITE_EDITOR_URL}>Write</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/logout'>Log Out</Link></li>
      </>
    )
  }

  return (
    <>
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
    </>
  )
}

function Menu() {
  const windowDimensions = useWindowDimensions();
  const [hideMenu, setHideMenu] = useState(windowDimensions.width < 480);
  const className = hideMenu ? styles.links : styles.links + ' ' + styles.hide;

  return (
    <div className={styles.menu}>
      {windowDimensions.width < 480 && 
        <ToggleMenuButton hideMenu={hideMenu} setHideMenu={setHideMenu} />
      }
      <ul className={className}>
        <Links />
      </ul>
    </div>
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