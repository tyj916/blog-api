import { createModal } from "../utils/index";
import AuthenticationForm from "./Authentication";

function Logo() {
  return (
    <a href="/">
      <h1>Logo</h1>
    </a>
  );
}

function Menu() {
  return (
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        <button onClick={() => createModal(<AuthenticationForm type='signUp' text='Create an account to start writing.' />)}>
          Write
        </button>
      </li>
      <li>
        <button onClick={() => createModal(<AuthenticationForm type='login' text='Welcome Back.' />)}>
          Log In
        </button>
      </li>
      <li>
        <button onClick={() => createModal(<AuthenticationForm type='signUp' text='Join Us.' />)}>
          Get Started
        </button>
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