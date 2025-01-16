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
  const menuList = [
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
      {menuList.map((item) => {
        return <li key={item.name}><a href={item.url}>{item.name}</a></li>
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
