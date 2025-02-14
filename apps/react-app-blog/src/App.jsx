import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import './styles/App.module.css';

function App() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;