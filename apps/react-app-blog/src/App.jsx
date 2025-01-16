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
    <div>
      <div id='modal-container'></div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;