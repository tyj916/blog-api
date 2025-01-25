import { useNavigate, Link } from "react-router-dom";
import { isLoggedIn } from "../utils/index";

function Logo() {
  return (
    <a href="/">
      <h1>Logo</h1>
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
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/write">Write</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li>
          <button onClick={logOut}>
            Log Out
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        {/* Create an account to start writing. */}
        <Link to='signUp'>
          Write
        </Link>
      </li>
      <li>
        {/* Welcome Back. */}
        <Link to='login'>
          Log In
        </Link>
      </li>
      <li>
        {/* Join Us. */}
        <Link to='signUp'>
          Get Started
        </Link>
      </li>
    </ul>
  );
}

function Header() {
  return (
    <header>
      <div className='container'>
        <Logo />
        <Menu />
      </div>
    </header>
  );
}

export default Header;