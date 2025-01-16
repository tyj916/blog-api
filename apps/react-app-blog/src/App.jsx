import { useState } from 'react'
import './App.css'

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

function Main() {
  return (
    <main>
      <div className='container'>
        <p>Temporary</p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p className="copyright">
        &copy; 2025 <a href="https://github.com/tyj916">tyj916</a>
      </p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
