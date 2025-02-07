import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import styles from './styles/App.module.css';

function App() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;