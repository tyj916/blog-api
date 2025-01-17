import createModal from "../utils/index";
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
      <li><button type="button" onClick={() => createModal(<AuthenticationForm />)}>Log In</button></li>
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