import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

function Main() {
  return (
    <main>
      <div className='container'>
        <p>Temporary</p>
      </div>
    </main>
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
