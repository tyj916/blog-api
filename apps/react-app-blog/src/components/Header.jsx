function Logo() {
  return (
    <a href="/">
      <h1>Logo</h1>
    </a>
  );
}

function Menu() {
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Sign In",
      url: "/login",
    }
  ];

  return (
    <ul>
      {links.map((link) => {
        return <li key={link.name}><a href={link.url}>{link.name}</a></li>
      })}
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