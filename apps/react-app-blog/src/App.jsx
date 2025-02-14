import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import './styles/App.module.css';

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;